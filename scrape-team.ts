import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeTeam() {
  console.log('Fetching Meet the Team page...');
  const res = await fetch('https://www.unfurlinglittles.com/meet-the-team');
  const html = await res.text();
  const $ = cheerio.load(html);

  // Wix structure usually has images inside <wix-image> or <img> tags,
  // and text in <span> tags inside <p> tags.
  // Because it's hard to associate an image with the exact text beneath it due to 
  // absolute positioning grid layouts characteristic of Wix, we can just extract all faces
  // and all names/titles where possible, or rely on a simpler approach.
  
  // Alternatively, let's look at the actual names from the parsed markdown earlier:
  const teamList = [
    { section: "Operational and Administrative Core Team", titleStr: "Founder + Clinical Director", nameStr: "Maggie Haraburda MS LBS BCBA", bioLink: "https://www.unfurlinglittles.com/about-5" },
    { section: "Operational and Administrative Core Team", titleStr: "Office Manager", nameStr: "Sam Henderson", bioLink: "" },
    { section: "Operational and Administrative Core Team", titleStr: "Administrative Assistant", nameStr: "Elizabeth Choplin MS RBT", bioLink: "" },
    { section: "Operational and Administrative Core Team", titleStr: "Administrative Director", nameStr: "Jules Waldman", bioLink: "" },
    { section: "Operational and Administrative Core Team", titleStr: "Lead Teacher", nameStr: "Andrea Dohrmann", bioLink: "" },
    { section: "Operational and Administrative Core Team", titleStr: "Director of Human Resources", nameStr: "Abigail Nash", bioLink: "" },
    { section: "Operational and Administrative Core Team", titleStr: "Assistant Clinical Director", nameStr: "Lauren O'Donnell", bioLink: "" },

    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Lauren Haley M.Ed., BCBA, LBS, CTP", bioLink: "https://www.unfurlinglittles.com/copy-of-maggie-2" },
    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Julia Santa Maria MS, LBS, BCBA", bioLink: "" },
    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Allie Cooper", bioLink: "" },
    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Jon Helfaer", bioLink: "" },
    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Kelsey Buckler", bioLink: "" },
    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Yebin Shin", bioLink: "" },
    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Jude Smithey", bioLink: "" },
    { section: "Board Certified Behavior Analysts", titleStr: "BCBA", nameStr: "Natalie Ferrer", bioLink: "" },

    { section: "Mental Health Department", titleStr: "Director of Evaluations", nameStr: "Dr. Rachel Sandercock", bioLink: "https://www.unfurlinglittles.com/copy-of-maggie-1" },
    { section: "Mental Health Department", titleStr: "Counseling Intern", nameStr: "Jordon Constantino", bioLink: "https://www.unfurlinglittles.com/jordon" },
    { section: "Mental Health Department", titleStr: "Counseling Intern", nameStr: "Steph Iozzia", bioLink: "" },

    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Kyle Harris", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Leah Mowery RBT", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "BCBA Candidate", nameStr: "Alexseyia Mcbride", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "Fellowship Coordinator", nameStr: "Melodye Jemmott", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "Bird Caretaker", nameStr: "Ana Sosa-Ebert", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Lauren Massarella", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "Sensory Specialist", nameStr: "Alex Thode MS, LBS, RBT", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "BCBA Candidate", nameStr: "Sierra Nicholson", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Mar Schneider", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "Assistant Teacher", nameStr: "Rebecca Rainis", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Tahira Mackie", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Raychan Abdallah", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "BCBA Candidate", nameStr: "Marley Wardle RBT", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Tessa Mulders", bioLink: "" },
    { section: "Registered্বা Registered Behavior Technicians", titleStr: "RBT", nameStr: "Kayl Bothom", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Caitlin Baker", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "Book DJ", nameStr: "Pepper Gardner", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "AAC Coordinator", nameStr: "Ruth Long", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "After School Coordinator", nameStr: "Ebony Edwards", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Nicole Doyle", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Jesse Garten", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Emili Woriax", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Percy Shipper", bioLink: "" },
    { section: "Registered Behavior Technicians", titleStr: "RBT", nameStr: "Erin McLaughlin", bioLink: "" }
  ];

  // We have the names explicitly, but what about the images?
  // Let's grab all wix images in the page that look like headshots (mostly have alt text or are in specific containers)
  const images: { src: string, alt: string, url: string }[] = [];
  $('img').each((i, el) => {
    let src = $(el).attr('src') || '';
    if (src.includes('wixstatic.com/media')) {
      // transform Wix low-res URL to high-res if needed
      // wix urls look like: https://static.wixstatic.com/media/xxx/v1/fill/w_182,h_186,.../xxx.webp
      images.push({ 
        src: src.replace(/w_\d+,h_\d+/, 'w_600,h_600'), // upscale a bit
        alt: $(el).attr('alt') || '',
        url: src 
      });
    }
  });

  // Basic heuristic: many alt tags in Wix match the text nearby if accessibility was filled out.
  // We can just dump the ones that look like portraits.
  
  // Format teams into sections
  const grouped = {};
  for (let t of teamList) {
    if (!grouped[t.section]) grouped[t.section] = { id: t.section.toLowerCase().replace(/ /g, '-'), title: t.section, members: [] };
    
    // Guess image if alt matches name loosely, else blank
    let foundImg = images.find(img => img.alt && img.alt.toLowerCase().includes(t.nameStr.toLowerCase().split(' ')[0]));
    
    grouped[t.section].members.push({
      id: Math.random().toString(36).substring(7),
      name: t.nameStr,
      title: t.titleStr,
      image: foundImg ? foundImg.src : '',
      slug: t.nameStr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      bio: t.bioLink ? 'Full bio available at: ' + t.bioLink : (t.nameStr + ' is an integral part of our team, providing compassionate and neurodiversity-affirming care.')
    });
  }

  const newSections = Object.values(grouped);

  // Read current defaultContent.ts
  let currentContent = fs.readFileSync('src/data/defaultContent.ts', 'utf8');
  
  // Serialize the new team array
  const teamReplacement = JSON.stringify(newSections, null, 2);
  
  // We need to inject this into defaultContent.ts
  // Find where `team: { sections: [` is and replace
  // For simplicity, just use a regex replace
  const match = currentContent.match(/team:\s*\{\s*sections:\s*\[[\s\S]*?\]\s*\}/);
  if (match) {
    const updated = currentContent.replace(match[0], `team: { sections: ${teamReplacement} }`);
    fs.writeFileSync('src/data/defaultContent.ts', updated);
    console.log('Successfully updated defaultContent.ts with actual team data.');
  }

}

scrapeTeam().catch(console.error);

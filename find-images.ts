import * as cheerio from 'cheerio';
import fs from 'fs';

async function mapImages() {
  const html = fs.readFileSync('/tmp/meet.html', 'utf8');
  const $ = cheerio.load(html);

  const teamList = [
    "Maggie", "Sam Henderson", "Elizabeth Choplin", "Jules Waldman", "Andrea Dohrmann", 
    "Abigail Nash", "Lauren O'Donnell", "Lauren Haley", "Julia Santa Maria", "Allie Cooper", 
    "Jon Helfaer", "Kelsey Buckler", "Yebin Shin", "Jude Smithey", "Natalie Ferrer", 
    "Dr. Rachel Sandercock", "Jordon Constantino", "Steph Iozzia", "Kyle Harris", "Leah Mowery", 
    "Alexseyia", "Melodye", "Ana Sosa-Ebert", "Lauren Massarella", "Alex Thode", 
    "Sierra", "Mar Schneider", "Rebecca", "Tahira", "Raychan", 
    "Marley", "Tessa", "Kayl", "Caitlin", "Pepper Gardner", 
    "Ruth Long", "Ebony", "Nicole", "Jesse", "Emili", 
    "Percy", "Erin"
  ];

  const mappings: Record<string, string> = {};

  // For wix, the text is often in a text component, and the image is in a sibling or parent container.
  // One way to map them is positional, but cheerio doesn't have bounding boxes.
  // We can just dump all the images and their surrounding text.
  
  $('img').each((i, el) => {
    let src = $(el).attr('src') || '';
    if (src.includes('wixstatic.com/media')) {
      // Find text nearby
      let parentHTML = $(el).closest('div').parent().parent().parent().text();
      let foundName = teamList.find(n => parentHTML.includes(n));
      const upscaledSrc = src.replace(/w_\d+,h_\d+/, 'w_600,h_600');

      if (foundName) {
        mappings[foundName] = upscaledSrc;
      }
    }
  });

  // Since Maggie Haraburda is the clinical director, her image might not be in the same immediate DOM tree.
  // Let's print out all images and alt texts to see what Maggie's is.
  $('img').each((i, el) => {
    let alt = $(el).attr('alt') || '';
    let src = $(el).attr('src') || '';
    if(alt.toLowerCase().includes('maggie')) {
        mappings['Maggie'] = src.replace(/w_\d+,h_\d+/, 'w_600,h_600');
    }
  });

  console.log(JSON.stringify(mappings, null, 2));
}

mapImages().catch(console.error);

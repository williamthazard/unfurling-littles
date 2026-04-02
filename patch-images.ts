import fs from 'fs';

// Run `npx tsx find-images.ts` output
const mappings: Record<string, string> = {
  "Maggie": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg/v1/crop/x_73,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-09-23%20at%208_41_edited.jpg",
  "Sam Henderson": "https://static.wixstatic.com/media/dbc86f_b5ba734919ba48d38e74706915cae4aa~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sam%20henderson.jpeg",
  "Elizabeth Choplin": "https://static.wixstatic.com/media/dbc86f_c87928e03e364db785fc31531c4dafac~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_6323_edited.jpg",
  "Jules Waldman": "https://static.wixstatic.com/media/dbc86f_5d003f9ecf2f4e3087686a439a54df81~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jules_edited_edited.png",
  "Andrea Dohrmann": "https://static.wixstatic.com/media/dbc86f_bfb3348605004823bb4729a2083a44e3~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Andrea_edited_edited_edited.png",
  "Abigail Nash": "https://static.wixstatic.com/media/bd5125_4aa8a3cee68e436094f3c92f4172a7ae~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
  "Lauren O'Donnell": "https://static.wixstatic.com/media/dbc86f_5f3accdba5234ac188b48bf8c436f0e0~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Lauren%20O'Donnel.png",
  "Lauren Haley": "https://static.wixstatic.com/media/dbc86f_a3a60a5497554fbc9c2aa78bd6734568~mv2.png/v1/crop/x_0,y_69,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-09-23%20at%208_36_edited.png",
  "Julia Santa Maria": "https://static.wixstatic.com/media/dbc86f_9ca61e2514d74b808601057ed5efcdc2~mv2.png/v1/crop/x_0,y_97,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_5310_edited.png",
  "Allie Cooper": "https://static.wixstatic.com/media/dbc86f_8be947428fc4430684f7c7978d657ef6~mv2.png/v1/crop/x_82,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Allie_edited.png",
  "Jon Helfaer": "https://static.wixstatic.com/media/dbc86f_4883b165c55b49aba7b8f7595bc30c99~mv2.png/v1/crop/x_167,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jon%20_edited_edited.png",
  "Kelsey Buckler": "https://static.wixstatic.com/media/dbc86f_37be5db59677402cb266fc58aa649db2~mv2.png/v1/crop/x_95,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kelsey_edited.png",
  "Yebin Shin": "https://static.wixstatic.com/media/dbc86f_0d6e052a45e040db9a56394636e42d2f~mv2.jpeg/v1/crop/x_0,y_609,w_600,h_600/fill/w_287,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3601.jpeg",
  "Jude Smithey": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/crop/x_60,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Natalie Ferrer": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/crop/x_60,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Dr. Rachel Sandercock": "https://static.wixstatic.com/media/dbc86f_2ebb573990184441b514699912e76539~mv2.jpg/v1/crop/x_69,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/22CACD20-3D18-4894-A142-9BC722FA03E6_edited_edited.jpg",
  "Jordon Constantino": "https://static.wixstatic.com/media/dbc86f_a17b3c5d079e46feb1494f85524ccfce~mv2.jpg/v1/crop/x_0,y_234,w_600,h_600/fill/w_287,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jordon%20Headshot_edited.jpg",
  "Steph Iozzia": "https://static.wixstatic.com/media/bd5125_4aa8a3cee68e436094f3c92f4172a7ae~mv2.png/v1/crop/x_113,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
  "Kyle Harris": "https://static.wixstatic.com/media/bd5125_db0ce2d25346403d823285a560028842~mv2.jpeg/v1/crop/x_246,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image0.jpeg",
  "Leah Mowery": "https://static.wixstatic.com/media/dbc86f_f9d1ff1aae87430e8d01fa0942a8bcfc~mv2.jpg/v1/crop/x_420,y_0,w_600,h_600/fill/w_287,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Headshot_edited.jpg",
  "Alexseyia": "https://static.wixstatic.com/media/dbc86f_691a3464e3c549ae9795880509851d6c~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot_20240819_145240_Gallery_edited.jpg",
  "Melodye": "https://static.wixstatic.com/media/dbc86f_d24adf95ae0a4de3acc2a5fbed09d3ed~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image0_edited.jpg",
  "Ana Sosa-Ebert": "https://static.wixstatic.com/media/dbc86f_9e77eec902a84e3ebe9d19f10e24bd28~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4108_edited.png",
  "Lauren Massarella": "https://static.wixstatic.com/media/dbc86f_02510232f2e647e1b43bfc33c47b64fe~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4186_edited.png",
  "Alex Thode": "https://static.wixstatic.com/media/dbc86f_28215c080728487d87bbe2dc5df23aaa~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/head%20shot_edited.png",
  "Sierra": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Mar Schneider": "https://static.wixstatic.com/media/dbc86f_7fa4655a3bfe47d99c1023eb55f921e9~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Mar%20Headshot_edited.jpg",
  "Rebecca": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Tahira": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Raychan": "https://static.wixstatic.com/media/dbc86f_ef14adf1514f4f9984d3f45fcedb2355~mv2.png/v1/crop/x_0,y_635,w_600,h_600/fill/w_287,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ray%20Headshot%20_heic.png",
  "Marley": "https://static.wixstatic.com/media/dbc86f_e7df6c1497b243829bd2ac99ae4b0818~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_0006_Original.jpeg",
  "Tessa": "https://static.wixstatic.com/media/dbc86f_b1abcfbaeb464bbcbe90f1b8c9710503~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7186.jpeg",
  "Kayl": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Caitlin": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Pepper Gardner": "https://static.wixstatic.com/media/dbc86f_260d1c4b37e84da0a0c2f2c33bdc3096~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7643%20-%20Pepper%20Gardner.jpeg",
  "Ruth Long": "https://static.wixstatic.com/media/dbc86f_cb704d674c8643f082210b3f6a97bc36~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_6217%20(1).jpg",
  "Ebony": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Nicole": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Jesse": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Emili": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Percy": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "Erin": "https://static.wixstatic.com/media/bd5125_853566b701ae4965a46b64966d1723d6~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png"
};

const contentPath = 'src/data/defaultContent.ts';
let contentStr = fs.readFileSync(contentPath, 'utf8');

// Replace logic: Since the content is a huge defaultContent object string natively in JS, I'll regex it loosely
// However, parsing it is better, but since it's a TS file we can't `require` it directly in plain Node.
// So let's just do targeted string replaces.
for (const [key, url] of Object.entries(mappings)) {
    // Find where the member name matches, and replace the soon-to-follow image:"" with the mapped image
    // e.g. "name": "Maggie Haraburda MS LBS BCBA",\n        "title": "Founder + Clinical Director",\n        "image": "",
    // We can just look for the block containing the name
    
    // Quick regex to find the `image: ""` line within the nearest {} that contains the key
    const rx = new RegExp(`(\"name\"\\s*:\\s*\"[^\"]*${key}[^\"]*\".*?\"image\"\\s*:\\s*\")[^\"]*(\")`, 's');
    contentStr = contentStr.replace(rx, `$1${url}$2`);
}

fs.writeFileSync(contentPath, contentStr);
console.log('Fixed defaultContent images!');

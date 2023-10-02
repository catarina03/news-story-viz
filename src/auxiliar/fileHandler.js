import udpatePageTitle from './updatePageTitle.js';
import updateSourceAnnTab from './updateSourceAnnTab.js';

let _currFile;

const FileHandler = () => {
  /*
  const num_lusa_files = [0,1,2,10,11,12,13,14,15,16,17,18,19,99,100,
    101,102,103,104,105,106,107,108,110,
    111,112,113,114,115,116,117,118,119,120,
    122,123,124,125,126,127,128,129,130,
    131,132,133,134,135,136,137,138,139,140,
    142,143,144,145,146,147,148,149,150,
    151,152,153,155,156,157,158,159,160,
    161,162,163,164,165,166,167,168,169,170,
    171,172,173,174,175,176,177,178,179,180,
    181,182,183,184,185,186,187,188,189,190,
    191,192,193,194,195,196,197,198,199,200,
    201,202,203,204,205,206,207,208];
    */
  const num_lusa_files = [0,112,120];
  const lusa_filenames = num_lusa_files.map(element => "lusa_" + element + ".json");

  /*const original_fnames = [
    'carnationRevolution.json',
    'formattedOgExample.json',
    'littleRedRidingHood.json',
    't2s.json',
    'capitolRiot.json',
  ];

  const fnames = [...original_fnames, ...lusa_filenames] */
  const fnames = lusa_filenames

  async function file(filename) {
    // JSON file
    udpatePageTitle(filename);
    const response = await fetch(
      `assets/narratives/${filename}`
    ).catch((err) => {
      console.log(err); 
    });
    _currFile = filename;
    const data = await response.json();
    data.filename = filename;

    // ANN file
    const filenameAnn = filename.replace('.json', '.ann');
    const responseAnn = await fetch(
      `assets/brat/${filenameAnn}`
    ).catch((err) => {
      console.log(err); 
    });
    const dataAnn = await responseAnn.text();
    updateSourceAnnTab(filenameAnn, dataAnn)

    return data;
  }

  async function fileVersion(filename, originalFileName) {
    // JSON file
    udpatePageTitle(filename);
    const response = await fetch(
      `assets/narratives/${filename}`
    ).catch((err) => {
      console.log(err); 
    });
    _currFile = filename;
    const data = await response.json();
    data.filename = filename;

    // ANN file
    const filenameAnn = originalFileName.replace('.json', '.ann');
    const responseAnn = await fetch(
      `assets/brat/${filenameAnn}`
    ).catch((err) => {
      console.log(err); 
    });
    const dataAnn = await responseAnn.text();
    updateSourceAnnTab(filenameAnn, dataAnn)

    return data;
  }

  function filenames() {
    return fnames;
  }

  function currFile() {
    return _currFile;
  }

  return {
    file,
    fileVersion,
    filenames,
    currFile,
  };
};

export default FileHandler;

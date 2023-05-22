import udpatePageTitle from './updatePageTitle.js';

let _currFile;

const FileHandler = () => {
  const num_lusa_files = 2;
  const lusa_filenames = Array(num_lusa_files).fill().map((element, index) => "lusa_" + index + ".json");

  const original_fnames = [
    'carnationRevolution.json',
    'formattedOgExample.json',
    'littleRedRidingHood.json',
    't2s.json',
    'capitolRiot.json',
  ];

  const fnames = [...original_fnames, ...lusa_filenames] 

  async function file(filename) {
    udpatePageTitle(filename);
    const response = await fetch(
      `/assets/narratives/${filename}`
    );
    _currFile = filename;
    const data = await response.json();
    data.filename = filename;
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
    filenames,
    currFile,
  };
};

export default FileHandler;

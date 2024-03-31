const importAll = (r) => {
  let files = {};
  r.keys().forEach((key) => (files[key] = r(key)));
  return files;
};

const files = importAll(require.context('./', false, /\.(jsx)$/));
export default files

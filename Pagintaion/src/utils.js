const paginate = (followers) => {
  const itemsPerPage = 11;
  const pages = Math.ceil(followers.length / itemsPerPage);

  //set array of arrays:
  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });

  return newFollowers;
};

export default paginate;

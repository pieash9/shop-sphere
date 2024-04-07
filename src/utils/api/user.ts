export const getAllUsers = async () => {
  const res = await fetch("https://fakestoreapi.com/users");
  return res.json();
};

export const getSingleUser = async (id: number) => {
  const res = await fetch(`https://fakestoreapi.com/users//${id}`);
  return res.json();
};

import getApi from "../lib/axios";

export const createUser = async (displayName) => {
  const inst = await getApi();
  return inst.post("/user", {
    displayName,
  });
};

export const createPass = async (masterPassword) => {
  const inst = await getApi();
  return inst.patch("/user", {
    masterPassword,
  });
};

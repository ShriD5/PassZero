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

export const createAccount = async (
  accountName,
  website,
  password,
  MasterPassword
) => {
  const inst = await getApi();
  return inst.post("/account", {
    accountName,
    website,
    password,
    MasterPassword,
  });
};

export const showAccount = async (id, masterPassword) => {
  const inst = await getApi();
  return inst.post("/accounts/" + id + "/decrypt", { masterPassword });
};

export const deleteAcc = async (id, masterPassword) => {
  const inst = await getApi();
  return inst.delete("/accounts/" + id, { data: { masterPassword } });
};

export const UpdateAcc = async (
  id,
  masterPassword,
  accountName,
  password,
  website
) => {
  const inst = await getApi();
  return inst.patch("/accounts/" + id, {
    data: { masterPassword, accountName, password, website },
  });
};

export const fetchAccount = async () => {
  const inst = await getApi();
  console.log();
  return inst.get("/accounts");
};

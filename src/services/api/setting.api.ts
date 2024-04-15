import instance from "./axios";

const getSetting = () => {
  return instance.get("/settings");
};

const updateSetting = (id: string) => {
  return instance.put(`/links/${id}`);
};

export const SettingApi = {
  getSetting,
  updateSetting,
};

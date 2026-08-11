export const formatRupiah = (val: number) => {
  if (!val || isNaN(val)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(val)
    .split(",")[0];
};

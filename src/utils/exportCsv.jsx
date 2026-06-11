export const exportToCSV = (data, filename = "export.csv") => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const rows    = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      const str = String(val ?? "").replace(/"/g, '""');
      return str.includes(",") || str.includes("\n") || str.includes('"')
        ? `"${str}"`
        : str;
    }).join(",")
  );

  const csv  = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href     = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
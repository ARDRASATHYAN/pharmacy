// Convert UTC ISO string to India/Kerala local string
export function formatToKeralaDateTime(utcString) {
  if (!utcString) return "";

  try {
    return new Date(utcString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    });
  } catch (e) {
    console.error("Invalid date:", utcString, e);
    return utcString;
  }
}

// If you need separate date only
export function formatToKeralaDate(utcString) {
  if (!utcString) return "";

  try {
    return new Date(utcString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch (e) {
    console.error("Invalid date:", utcString, e);
    return utcString;
  }
}

// If you need time only
export function formatToKeralaTime(utcString) {
  if (!utcString) return "";

  try {
    return new Date(utcString).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch (e) {
    console.error("Invalid date:", utcString, e);
    return utcString;
  }
}

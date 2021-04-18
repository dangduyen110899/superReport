import report from "../../../api/admin/Report";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const downloadFile = (data) => {
  const down = async () => {
    try {
      await report.download(data).then((res) => {
        toast.success("Download file success");
        const url = window.URL.createObjectURL(new Blob([res.data]), {
          type: res.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${report}`);
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      toast.error("failed API: ", error);
    }
  };
  down();
};

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import HomeIcon from "@material-ui/icons/Home";

export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export enum RoleIDs {
  ROLE_USER = 2,
  ROLE_ADMIN = 1,
}

export enum Routes {
  //general routes
  HOME = "/",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  FORGOT_PASSWORD = "/forgotpassword",
  PROFILE = "/profile",
  CHANGE_PASSWORD = "/changepassword",

  //user routes
  NEWS = "/news",
  HOSPITAL = "/hospital",

  //admin routes
  MANAGE_ACCOUNT = "/manageaccount",
  UPLOAD = "/upload",
  CRAWL = "/crawl",
}

export type PageListItem = {
  icon: any;
  text: string;
  to: string;
  hidden: boolean;
};

export const userPageList: PageListItem[] = [
  {
    icon: <HomeIcon />,
    text: "Trang chủ",
    to: Routes.HOME,
    hidden: false,
  },
  {
    icon: <AccountCircleIcon />,
    text: "Tài khoản của tôi",
    to: Routes.PROFILE,
    hidden: false,
  },
  {
    icon: <FindInPageIcon />,
    text: "Tin tức",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <LocalHospitalIcon />,
    text: "Tìm Bệnh viện",
    to: Routes.HOSPITAL,
    hidden: false,
  },
  {
    icon: null,
    text: "Đổi Mật khẩu",
    to: Routes.PROFILE,
    hidden: true,
  },
];

export const adminPageList: PageListItem[] = [
  {
    icon: <HomeIcon />,
    text: "Trang chủ",
    to: Routes.HOME,
    hidden: false,
  },
  {
    icon: <AccountCircleIcon />,
    text: "Quản lý Tài khoản",
    to: Routes.MANAGE_ACCOUNT,
    hidden: false,
  },
  {
    icon: <FindInPageIcon />,
    text: "Quản lý Tin tức",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <LocalHospitalIcon />,
    text: "Quản lý Bệnh viện",
    to: Routes.HOSPITAL,
    hidden: false,
  },
  {
    icon: <CloudUploadIcon />,
    text: "Thu thập dữ liệu",
    to: Routes.CRAWL,
    hidden: false,
  },
  {
    icon: <CloudUploadIcon />,
    text: "Thu thập dữ liệu",
    to: `${Routes.CRAWL}/upload`,
    hidden: true,
  },
  {
    icon: <CloudUploadIcon />,
    text: "Upload thông tin Tin tức",
    to: `${Routes.UPLOAD}/news`,
    hidden: true,
  },
  {
    icon: <CloudUploadIcon />,
    text: "Upload thông tin Bệnh viện",
    to: `${Routes.UPLOAD}/hospital`,
    hidden: true,
  },
];

export const preLoginList: PageListItem[] = [
  {
    icon: <HomeIcon />,
    text: "Hệ thống hỗ trợ chẩn đoán bệnh",
    to: Routes.HOME,
    hidden: true,
  },
  {
    icon: <ExitToAppIcon />,
    text: "Đăng nhập",
    to: Routes.LOGIN,
    hidden: false,
  },
  {
    icon: <FiberNewIcon />,
    text: "Đăng ký",
    to: Routes.SIGN_UP,
    hidden: false,
  },
  {
    icon: <RotateLeftIcon />,
    text: "Quên Mật khẩu",
    to: Routes.FORGOT_PASSWORD,
    hidden: false,
  },
];

export const hospitalCsv = `id,name,number,ward,district,city,workingTime,introduction,services,department,website,link,phone
107,Nha khoa Tương Lai,"76/1 Võ Thị Sáu,",Phường Tân Định,Quận 1,", Hồ Chí Minh","T2,T3,T4,T5,T6,T7: 08:00 - 19:30",,"Nhổ răng, Trám răng, Lấy vôi, Răng tháo lắp, Răng sứ, Tẩy trắng răng",Nha Khoa,,https://timbenhvien.vn/chi-tiet/nha-khoa-tuong-lai/357,028.3820.1003`;

export const newsCsv = `title,body,tag,link
"Test Title 1","Body 1","Tag 1,Tag 2","link test"
"Test Title 2","Body 2","Tag 1,Tag 2","link test"
`;

export const crawlJson = `{
  "prefixUrl": "https://vinmec.com/vi/tin-tuc/",
  "startUrl":"https://vinmec.com/vi/tin-tuc/",
  "patternUrl": "^https://vinmec.com/vi/tin-tuc/(([a-z]|[-])+)/(([a-z]|[-])+)/((([a-z]|[-])+)/)*$",
  "elasticsearchIndex":"test-news",
  "data": {
      "title":"normalize-space(//*[@id=\\"vue-bootstrap\\"]/div[2]/div[2]/h1/text())",
      "tag":"//*[@id=\\"vue-bootstrap\\"]/div[2]/div[3]/div[3]/a/text()"
  }
}`;

export const crawlGuide = `Hệ thống thu thập dữ liệu bằng framework Scrapy của Python, sẽ đi đến tất cả các đường dẫn có trong các trang đi qua.
prefixUrl: là tiền tố của đường dẫn, tránh việc thu thập các trang web khác, có thể gây lỗi.
startUrl: là đường dẫn của trang đầu tiên khi thu thập
patternUrl: là mẫu của đường dẫn tại trang cần thu thập cuối cùng, định dạng theo chuẩn Python Regular Expression, có thể tham khảo thêm cách viết tại: https://www.w3schools.com/python/python_regex.asp
elasticsearchIndex: là tên của index muốn lưu trên elasticsearch, nếu muốn thu thập dữ liệu bệnh viện thì elasticsearchIndex là “hospital”, nếu muốn thu thập dữ liệu bài báo thì elasticsearchIndex là “news”. Khi đó, nên thu thập đầy đủ các trường theo định dạng mà hệ thống có sẵn. Ví dụ: dữ liệu bệnh viện sẽ có các trường: name, number, ward, district, city, workingTime, introduction, services, department, website, link, phone. Dữ liệu bài báo sẽ có các trường: title, body, tag, link.
data: gồm các trường muốn thu thập, định dạng là [tên trường] : [xpath của trường đó].
`;

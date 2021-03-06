import React, { useMemo, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, CardActions, Link, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getNewsList, deleteNews } from "../../../redux/actions/creators/news";
import { RoleIDs } from "../../../shared/constants";
import CustomizedDialog from "../../Dialog";
import NewsDetailEdit from "./NewsDetailEdit";
import ConfirmDialog from "../../ConfirmDialog";
import { displayTags, getDomainFromUrl } from "./NewsList.helper";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export const mockData = [
  {
    id: "MGAUCnkBZLAYSuhRDCF6",
    title: "Khi nào nên cho bé đi khám sức khỏe tổng quát",
    body:
      '<div class="block-content cms pageview-highest">\n            \n\n\n\n    \n        <div class="rich-text"><p><b>Bài viết được tư vấn chuyên môn bởi Bác sĩ chuyên khoa I Bùi Thị Hà - Bác sĩ Nhi - Sơ sinh -</b> <a href="https://www.vinmec.com/khoa-nhi-so-sinh-benh-vien-da-khoa-quoc-te-vinmec-ha-long-93250/nhi"><b>Khoa Nhi - Sơ sinh - Bệnh viện Đa khoa Quốc tế Vinmec Hạ Long</b></a><b>.</b></p></div>\n    \n\n    \n\n    \n        \n            \n\n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="professional" object-id="51291" page-id=53733></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p><b>Khám sức khỏe tổng quát cho bé là vấn đề đang được rất nhiều bậc phụ huynh quan tâm. Có nên cho bé đi khám sức khỏe tổng quát hay không? Việc đó mang lại lợi ích gì? Khám khi nào là thích hợp? Các câu hỏi sẽ được giải đáp trong bài viết sau.</b></p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>1. Có nên cho bé đi khám sức khỏe tổng quát?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p><b>Có nên cho bé đi khám sức khỏe tổng quát</b> là thắc mắc của rất nhiều bậc phụ huynh. Câu trả lời ở đây là có, <b>khám sức khỏe tổng quát cho bé </b>đặc biệt  khi trẻ có những dấu hiệu bất thường là việc làm hết sức cần thiết và mang lại rất nhiều lợi ích, cụ thể là:</p><ul><li>Theo dõi sự phát triển của bé: Đây là vấn đề hàng đầu được các bậc phụ huynh quan tâm, <b>khám sức khỏe tổng quát cho bé</b> giúp bố mẹ hiểu được con mình có phát triển đúng tiêu chuẩn độ tuổi hay không, bé đang <a href="https://www.vinmec.com/vi/benh/suy-dinh-duong-3071/"><b>suy dinh dưỡng</b></a> hay <a href="https://www.vinmec.com/tin-tuc/thong-tin-suc-khoe/nao-duoc-coi-la-thua-can-beo-phi/"><b>thừa cân</b></a>? Ngoài ra khám sức khỏe tổng quát cho bé còn giúp đánh giá một cách toàn diện cả về thể chất lẫn sự phát triển tư duy, ngôn ngữ, giao tiếp xã hội của bé.</li><li>Giúp phòng ngừa: Khi <b>khám sức khỏe tổng quát cho bé </b>bố mẹ sẽ được bác sĩ tư vấn cụ thể về các vấn đề <a href="https://www.vinmec.com/vac-xin/kien-thuc-tiem-chung/lich-tiem-phong-day-du-cho-tre-tu-0-24-thang-tuoi/"><b>t</b>iêm phòng cho bé</a>. Tiêm phòng đầy đủ sẽ giúp bé phòng ngừa được những bệnh nguy hiểm dễ truyền nhiễm.</li><li>Tầm soát bệnh tật: Khi thấy bé có những dấu hiệu bất thường, phụ huynh nên tiến hành khám sức khỏe tổng quát cho bé, để nhận biết sớm những bệnh do bẩm sinh, di truyền như <a href="https://www.vinmec.com/tin-tuc/thong-tin-suc-khoe/dau-hieu-nhan-biet-som-benh-tim-bam-sinh-tre-em/">tim bẩm sinh</a>, <a href="https://www.vinmec.com/vi/benh/dong-kinh-4517/">bệnh động kinh</a>,...</li><li>Giải đáp mối lo ngại của phụ huynh: Thông qua kết quả <b>khám sức khỏe tổng quát cho bé, </b>bác sĩ sẽ trao đổi, đồng thời giải đáp để phụ huynh hiểu về tình trạng của bé, từ đó đưa ra những lời khuyên cũng như những giải pháp phù hợp.</li></ul></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>2. Khi nào nên cho bé đi khám sức khỏe tổng quát?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p>Tuy đã hiểu rõ tầm quan trọng của việc khám sức khỏe tổng quát cho bé, nhưng nhiều bố mẹ cũng không khỏi phân vân <b>khi nào nên cho bé đi khám sức khỏe tổng quát. </b>Về cơ bản, bố mẹ nên chú ý khám sức khỏe tổng quát cho bé ở các giai đoạn sau:</p><ul><li>Giai đoạn 2 năm đầu đời, khi bé từ 0-18 tháng tuổi</li><li>Giai đoạn sau 2 tuổi của bé</li></ul></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <figure class="post-image full">\n            \n                \n                <img class="full uploaded" v-lazy="\'https://vinmec-prod.s3.amazonaws.com/images/20200226_175618_436346_khamnhi.max-1800x1800.jpg\'" alt="Khám nhi" v-zoomable="53733">\n            \n\n            \n                <figcaption class="caption">\n                    <div class="rich-text">Giai đoạn trẻ 2 tuổi, cha mẹ có thể cân nhắc việc cho trẻ khám sức khoẻ tổng quát</div>\n                </figcaption>\n            \n        </figure>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><ul><li>Giai đoạn bé sau 12 tuổi</li></ul><p>Ở 2 giai đoạn đầu bé sẽ được kiểm tra sức khỏe một cách tổng quát như theo dõi cân nặng, chiều cao hay kích thước vòng đầu, đồng thời khi <b>khám sức khỏe tổng quát cho bé</b> bác sĩ cũng sẽ đánh giá các mốc phát triển về thần kinh và vận động. Sau khoảng 2 năm đầu (từ 0-12 tuổi), bé tiếp tục được theo dõi và <a href="https://www.vinmec.com/vac-xin/kien-thuc-tiem-chung/lich-tiem-chung-nhac-lai-day-du-cua-tat-ca-cac-loai-vac-xin/"><b>tiêm nhắc lại  một số loại vắc-xin</b></a>. </p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p>Ở giai đoạn sau 12 tuổi khi <b>khám sức khỏe tổng quát cho bé,</b> bác sĩ chỉ định một số xét nghiệm  cơ bản như:</p><ul><li><a href="https://www.vinmec.com/tin-tuc/thong-tin-suc-khoe/y-nghia-cua-cac-chi-so-xet-nghiem-sinh-hoa-mau/"><b>Xét nghiệm sinh hóa công thức máu</b></a></li><li><a href="https://www.vinmec.com/tin-tuc/thong-tin-suc-khoe/chi-so-duong-huyet-cua-nguoi-binh-thuong-la-bao-nhieu/"><b>Kiểm tra nồng độ đường huyết</b></a></li><li>Xét nghiệm <a href="https://www.vinmec.com/tin-tuc/thong-tin-suc-khoe/mo-mau-bao-nhieu-la-binh-thuong-bao-nhieu-la-cao/"><b>mỡ máu</b></a> </li><li>Kiểm tra các chức năng của <a href="https://www.vinmec.com/vi/co-the-nguoi/than-40/"><b>thận</b></a></li><li>Kiểm tra một số chức năng <a href="https://www.vinmec.com/vi/co-the-nguoi/gan-133/"><b>gan</b></a></li><li>Xét nghiệm đối với nước tiểu</li><li>Tiến hành <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/sieu-am-o-bung-la-sieu-am-nhung-bo-phan-nao/"><b>siêu âm bụng tổng quát</b></a></li><li>Chụp <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nao-la-chup-x-quang-tim-phoi-thang/?link_type=related_posts"><b>X-quang phổi</b></a><b>.</b></li></ul></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>3. Khám sức khỏe tổng quát cho bé có tốn thời gian?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p>Khám sức khỏe tổng quát cho bé không hề tốn thời gian, khi nhận thấy những khác lạ ở trẻ hoặc có nhu cầu theo dõi sự phát triển của con, phụ huynh hoàn toàn có thể đặt lịch trước với các cơ sở khám chữa bệnh uy tín. Thời gian <b>khám sức khỏe tổng quát cho bé </b>là khoảng từ 2-3 giờ. Kết quả sẽ được trả trong ngày hoặc lâu hơn, hiện nay một số cơ sở y tế cũng hỗ trợ trả kết quả đến tận nhà sau 2-3 ngày.</p><p>Bệnh viện Đa khoa Quốc tế Vinmec cung cấp gói <a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-tre-em/"><b>Khám sức khỏe tổng quát dành cho trẻ em</b></a> dưới 18 tuổi. Đây là gói khám sức khỏe toàn diện, bao gồm đầy đủ các dịch vụ đánh giá chức năng cơ bản của trẻ như: khám tai mũi họng, khám mắt, đánh giá chức năng gan thận, tim, phổi, xét nghiệm máu, xét nghiệm viêm gan và tình trạng dinh dưỡng của bé.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <figure class="post-image full">\n            \n                \n                <img class="full uploaded" v-lazy="\'https://vinmec-prod.s3.amazonaws.com/images/20200423_173022_451362_20190323_052306_733.max-1800x1800.jpg\'" alt="Khám bệnh" v-zoomable="53733">\n            \n\n            \n                <figcaption class="caption">\n                    <div class="rich-text">Bệnh viện Đa khoa Quốc tế Vinmec có nhiều gói khám dành cho nhiều đối tượng khác nhau</div>\n                </figcaption>\n            \n        </figure>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>4. Ưu điểm khi khám sức khỏe tổng quát cho bé tại Vinmec</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p>Hệ thống đạt tiêu chuẩn quốc tế: đạt tiêu chuẩn JCI (Joint Commission International). Đây là tiêu chuẩn an toàn khắt khe nhất thế giới. Tiêu chuẩn này lấy bệnh nhân làm trung tâm, cam kết mang đến cho bệnh nhân dịch vụ chăm sóc y tế an toàn, chất lượng</p><p>Cơ sở vật chất, trang thiết bị hiện đại: Bệnh viện Vinmec sở hữu cơ sở vật chất, trang thiết bị hiện đại giúp hỗ trợ chẩn đoán tốt nhất cho bệnh nhân như PET/CT, MRI, CT 640, hệ thống máy siêu âm hiện đại hàng đầu thế giới, phòng xét nghiệm đạt tiêu chuẩn quốc tế,... Phòng ốc thoáng mát, sạch sẽ, tạo sự thoải mái cho bệnh nhân và gia đình.</p><p>Đội ngũ nhân viên trình độ chuyên môn giỏi, giàu kinh nghiệm: Trước và sau khi thăm khám, bác sĩ luôn tư vấn, giải thích tận tình các kết quả thăm khám cho phụ huynh. Bên cạnh đó sau thăm khám, các nhân viên y tế vẫn sẵn sàng hỗ trợ khi cha mẹ có thắc mắc về tình hình sức khỏe của bé.</p><p>Hạn chế sử dụng thuốc kháng sinh cho bé: Tình trạng đề kháng kháng sinh đang tăng tới mức báo động do việc sử dụng kháng sinh bừa bãi. Khi bé mắc bệnh và cần điều trị tại Vinmec, các bác sĩ sẽ cân nhắc và hạn chế tối đa việc sử dụng cho trẻ.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        \n        <p>Để được tư vấn trực tiếp, Quý Khách vui lòng bấm số <a href="#" class="contact-button"><b>HOTLINE</b></a> hoặc đăng ký trực tuyến <a href="#" class="appointment-button"><b>TẠI ĐÂY</b></a>.</p>\n        \n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span>\n    \n\n    \n\n    \n        \n\n        \n            \n\n            \n        \n    \n\n\n\n            \n                <div class="three-recent-list mobile">\n                    <b>XEM THÊM:</b>\n                    <ul>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/cac-xet-nghiem-thuong-quy-can-lam-khi-mang-thai/?link_type=related_posts" title="Các xét nghiệm thường quy cần làm khi mang thai" class="post-title">Các xét nghiệm thường quy cần làm khi mang thai</a>\n                            </li>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/quy-dinh-ve-kham-suc-khoe-dinh-ky-cho-nguoi-lao-dong-theo-thong-tu-moi-nhat/?link_type=related_posts" title="Quy định về khám sức khỏe định kỳ cho người lao động theo thông tư mới nhất" class="post-title">Quy định về khám sức khỏe định kỳ cho người lao động theo thông tư mới nhất</a>\n                            </li>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/9-cau-hoi-thuong-gap-khi-mua-goi-kham-suc-khoe-tong-quat/?link_type=related_posts" title="9 câu hỏi thường gặp khi mua gói khám sức khỏe tổng quát" class="post-title">9 câu hỏi thường gặp khi mua gói khám sức khỏe tổng quát</a>\n                            </li>\n                        \n                    </ul>\n                </div>\n            \n        </div>',
    link:
      "https://vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nhi/khi-nao-nen-cho-be-di-kham-suc-khoe-tong-quat/",
    tag: [
      "Trẻ em",
      "Nhi",
      "Da liễu",
      "Xét nghiệm máu",
      "Gói khám sức khỏe tổng quát",
      "Xét nghiệm viêm gan",
      "Sức khỏe trẻ em",
      "Nha Khoa",
    ],
  },
  {
    id: "xWAgCnkBZLAYSuhR-y6_",
    title: "Những lưu ý quan trọng trước khi khám sức khỏe tổng quát",
    body:
      '<div class="block-content cms pageview-highest">\n            \n\n\n\n    \n        <div class="rich-text"><p><b>Bài viết được tư vấn chuyên môn bởi Bác sĩ chuyên khoa II, Bác sĩ cao cấp Đoàn Dư Đạt - Bác sĩ Nội tổng hợp – Khoa khám bệnh và Nội khoa - Bệnh viện Đa khoa Quốc tế Vinmec Hạ Long.</b></p></div>\n    \n\n    \n\n    \n        \n            \n\n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="professional" object-id="51137" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p><b>Khám sức khoẻ tổng quát nhằm đánh giá tình trạng sức khoẻ tổng thể của mỗi người ở một thời điểm thông qua việc đánh giá chức năng của hầu hết các cơ quan trong cơ thể đồng thời giúp phát hiện các bệnh lý nếu có.</b></p><p>Theo khuyến cáo từ Hiệp hội Tim mạch Mỹ, bạn cần tiến hành kiểm tra huyết áp hàng năm ở độ tuổi từ 18 trở lên để tầm soát nguy cơ tăng huyết áp. Bởi vậy, 18 sẽ là độ tuổi thích hợp để bạn bắt đầu <a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/?location=all"><b>khám sức khỏe tổng quát</b></a>. Việc khám tổng quát sẽ giúp phát hiện và điều trị sớm các bệnh lý về huyết áp, tiểu đường, mỡ máu, viêm gan,...Đối với trẻ em, điều quan trọng là tầm soát các dị tật bẩm sinh, tình trạng dinh dưỡng. Khám sức khỏe tổng quát định kỳ giúp bản thân có cái nhìn chung về tình trạng sức khỏe hiện tại. Dựa vào kết quả thăm khám và xét nghiệm tổng quát, bác sĩ sẽ chẩn đoán, phát hiện bệnh sớm, điều trị kịp thời và chuẩn xác, mang lại cơ hội khỏi bệnh cao.</p><p>Ngoài ra, <b>khám bệnh tổng quát</b> còn giúp bạn đánh giá và điều chỉnh lối sống thường ngày, nhờ đó hạn chế các rủi ro gây bệnh trong tương lai. Khám tổng quát định kỳ có ý nghĩa quan trọng với mọi giới và mọi lứa tuổi, cần được thực hiện 6 tháng/lần hoặc 1 năm/lần.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>1. Gói khám sức khỏe tổng quát bao gồm những gì?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p>Tùy theo từng độ tuổi, giới tính, <a href="/tin-tuc/thong-tin-suc-khoe/9-cau-hoi-thuong-gap-khi-mua-goi-kham-suc-khoe-tong-quat/"><b>gói khám sức khỏe tổng quát</b></a> sẽ được thiết kế sao cho phù hợp nhằm mang lại hiệu quả tối ưu nhất cho người bệnh. Theo đó, một gói khám tổng quát có thể bao gồm:</p><ul><li><b>Khám lâm sàng tổng quát bao gồm</b>: đánh giá biểu hiện lâm sàng của hệ tuần hoàn, hô hấp, tiêu hóa, thận - tiết - niệu, nội tiết, cơ - xương - khớp, hệ thần kinh, tâm thần, mắt, tai - mũi - họng, răng - hàm - mặt, da liễu. Bên cạnh đó có thể mở rộng phạm vi khám một số chuyên khoa khác như phụ khoa, nam khoa, lão khoa, ung bướu, ... tùy vào đặc điểm và yếu tố nguy cơ của mỗi người.</li><li><a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/tai-sao-xet-nghiem-mau-va-nuoc-tieu-lai-quan-trong-trong-goi-kham-suc-khoe-tong-quat-/?link_type=related_posts&amp;location=all"><b>Xét nghiệm máu</b>, <b>nước tiểu</b></a>: Một số xét nghiệm máu và nước tiểu thường quy có thể kể đến như: công thức máu 18 thông số, nước tiểu 10 thông số, đường máu (glucose), mỡ máu (Cholesterol, Triglycerid, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chi-so-ldl-cholesterol-trong-mau-la-gi/?location=all"><b>LDL</b></a>, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chi-so-hdl-cholesterol-trong-mau-cao-co-y-nghia-gi/?location=all"><b>HDL</b></a>), chức năng thận (ure, creatinin), men gan (SGOT, SGPT, GGT), viêm gan B (<a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chi-so-hbsag-la-gi/?location=all"><b>HBsAg</b></a>), tìm hồng cầu trong phân, một số marker ung thư,...</li><li><b>Chẩn đoán hình ảnh</b>: Các chẩn đoán hình ảnh thường quy là chụp X Quang (nhiều vị trí như lồng ngực, cột sống cổ, cột sống thắt lưng, khung chậu, ... tùy theo đặc điểm và yếu tố nguy cơ từng người); Siêu âm ổ bụng, siêu âm tuyến giáp, siêu âm vú đối với nữ, ...</li><li><b>Thăm dò chức năng</b>: <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/dien-tam-do-noi-len-dieu-gi/?location=all"><b>Điện tâm đồ</b></a>, điện não đồ, đo loãng xương,... (Tùy vào yếu tố nguy cơ để có sự lựa chọn phù hợp).</li></ul></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>2. Khám tổng quát bao gồm những gì?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p><b>Khám sức khỏe tổng quát</b> là dịch vụ khám bệnh toàn diện mọi bộ phận, cơ quan trên cơ thể nhằm tầm soát bệnh lý. Bao gồm các hạng mục: khám lâm sàng tổng quát, tư vấn, xét nghiệm tổng quát, chẩn đoán hình ảnh, thăm dò chức năng.</p><p>Nội dung khám tổng quát cụ thể:</p><ul><li>Kiểm tra thể lực, thông qua các thông số chung: huyết áp, đo chiều cao, cân nặng.</li><li>Khám nội tổng quát, phát hiện một số bệnh lý nội khoa như tim mạch, tiêu hóa, hô hấp, thận – tiết niệu...</li><li>Khám mắt, kiểm tra thị lực, tư vấn, phòng ngừa và điều trị các bệnh lý về mắt.</li><li>Khám răng miệng tổng quát, kiểm tra tình trạng sâu răng, cao răng, lợi.</li><li>Khám Tai – Mũi – Họng: Khám nội soi phát hiện các bệnh lý về xoang, dây thanh quản, họng mạn tính.</li><li>Xét nghiệm máu tổng phân tích 18 thông số: đường máu (glucose), chức năng thận (Ure, Creatinin), men gan (<a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chi-so-ast-la-gi-va-cac-muc-binh-thuong-thap-cao/?location=all"><b>AST</b></a>, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/lam-gi-khi-chi-so-alt-cao/?location=all"><b>ALT</b></a>, GGT), mỡ máu (Cholesterol, Triglycerid, LDL, HDL), acid uric máu (phát hiện viêm khớp, gout), viêm gan siêu vi B (HBSAG)...</li><li>Tổng phân tích nước tiểu 10 chỉ số: LEU (bạch cầu), Nitrite (NIT), độ pH, BLD (hồng cầu), GLU (Glucose), PRO (đạm)...</li><li>Chụp X-quang tim phổi.</li><li>Siêu âm ổ bụng tổng quát.</li><li>Siêu âm tuyến tiền liệt (nam giới).</li><li><a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/sieu-am-vu-phuong-phap-tam-soat-ung-thu-vu/?location=all"><b>Siêu âm vú</b></a>, tử cung, buồng trứng (nữ giới).</li></ul><p>Mỗi người tốt nhất nên chọn gói khám sức khỏe tổng quát, danh mục khám phù hợp với độ tuổi, nhu cầu và khả năng tài chính.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <figure class="post-image full">\n            \n                \n                <img class="full uploaded" v-lazy="\'https://vinmec-prod.s3.amazonaws.com/images/20190215_070755_419518_kham_suc_khoe_tong_.max-1800x1800.jpg\'" alt="khám sức khỏe tổng quát" v-zoomable="29284">\n            \n\n            \n                <figcaption class="caption">\n                    <div class="rich-text">Có nhiều điểm cần lưu ý trước khi khám sức khỏe tổng quát để đạt hiệu quả cao nhất</div>\n                </figcaption>\n            \n        </figure>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>3. Các xét nghiệm nên làm theo từng độ tuổi</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p></p><p>Ngoài khám lâm sàng và làm các xét nghiệm, sàng lọc nên làm khi khám sức khỏe tổng quát chung, cần khám trọng tâm theo từng độ tuổi:</p><ul><li><b>Tuổi từ 20-30:</b><ul><li>Khám và làm các xét nghiệm các bệnh truyền nhiễm như: viêm gan A, B, C, giang mai, bệnh lậu...</li><li>Kiểm tra sức khỏe tiền hôn nhân và chức năng sinh sản ở nam và nữ.</li></ul></li><li><b>Tuổi từ 30-40:</b><ul><li>Khám và làm các xét nghiệm về mỡ máu, tim mạch, gút, tiểu đường...</li><li>Đối với nam giới, kiểm tra chức năng gan, phổi nếu uống rượu bia, hút thuốc lá thường xuyên..</li><li>Phụ nữ cần khám phụ khoa, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/co-xuong-khop/do-mat-do-xuong-phat-hien-kip-thoi-tinh-trang-loang-xuong/?location=all"><b>đo mật độ loãng xương</b></a> ...</li></ul></li><li><b>Tuổi từ 40-60:</b><ul><li>Tầm soát các bệnh về ung thư như <a href="https://www.vinmec.com/vi/benh/ung-thu-tu-cung-4788/?location=all"><b>ung thư tử cung</b></a>, dạ dày, gan, phổi, <a href="https://www.vinmec.com/vi/benh/ung-thu-vom-hong-3170/?location=all"><b>ung thư vòm họng</b></a>...</li><li>Khám và làm các xét nghiệm về mỡ máu, tim mạch, xương khớp, gút, tiểu đường...</li></ul></li><li><b>Tuổi trên 60:</b><ul><li>Khám và làm các xét nghiệm về mỡ máu, tim mạch, mạch máu ngoại vi, xương khớp, gút, tiểu đường, bệnh hô hấp ...</li><li>Các bệnh ung thư...</li></ul></li></ul></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <figure class="post-image full">\n            \n                \n                <img class="full uploaded" v-lazy="\'https://vinmec-prod.s3.amazonaws.com/images/20190613_104419_198295_gia-dinh-hanh-phuc.max-1800x1800.jpg\'" alt="Gia đình hạnh phúc" v-zoomable="29284">\n            \n\n            \n                <figcaption class="caption">\n                    <div class="rich-text">Khám sức khỏe tổng quát cần khám đúng trọng tâm theo từng độ tuổi</div>\n                </figcaption>\n            \n        </figure>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>4. Chú ý khi đi khám sức khỏe định kỳ:</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p></p><p>Không ăn sáng, uống các chất có đường, gas hoặc chất gây nghiện như trà, cà phê ... để đảm bảo kết quả xét nghiệm máu và nước tiểu được chính xác.</p><ul><li>Nếu siêu âm bụng tổng quát, cần uống nhiều nước và nhịn tiểu cho tới khi siêu âm bụng xong (nước tiểu trong bàng quang giúp bác sĩ quan sát được toàn bộ thành bàng quang, tử cung và hai buồng trứng (đối với nữ) hoặc tuyến tiền liệt và túi tinh của nam).</li><li>Nếu nội soi dạ dày, cần nhịn ăn để bác sĩ quan sát tốt hơn bên trong dạ dày.</li><li>Không khám phụ khoa nếu trong kỳ kinh nguyệt, đang có thai.</li><li>Phụ nữ có gia đình tránh quan hệ tình dục trước ngày khám (nếu có khám phụ khoa).</li><li>Phụ nữ mang thai không chụp X-quang.</li><li>Các trường hợp siêu âm phụ khoa bằng đầu dò, cần tiểu hết cho bàng quang rỗng để bác sĩ dễ quan sát tử cung và phần phụ.</li><li>Vệ sinh cơ thể, tai, mũi, họng, vùng kín sạch sẽ để không làm ảnh hưởng đến tầm nhìn và quan sát của bác sĩ khi thăm khám.</li><li>Tùy thuộc vào độ tuổi, giới tính, bệnh sử và nhu cầu của từng cá nhân để chọn chương trình khám phù hợp.</li><li>Tùy theo lứa tuổi, sức khỏe để chọn thời gian khám định kỳ: 6 tháng/lần, 1 năm/lần, 2 năm/lần...</li><li>Trong khi khám có thể bác sỹ nghi ngờ có bệnh gì đó cần xét nghiệm thêm để chẩn đoán xác định</li><li>Có nhiều gói khám sức khỏe hiện nay, cần lựa chọn gói nào phù hợp với khả năng kinh tế và nguyện vọng của bản thân, cũng cần tham khảo ý kiến tư vấn của nhân viên y tế, để quyết định một cách phù hợp.</li></ul></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>5.Vì sao nên khám tổng quát tại Vinmec?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p></p><p>Khám sức khỏe tổng quát tại Vinmec khác hoàn toàn với việc kiểm tra sức khỏe thông thường, mỗi gói khám sức khỏe được thiết kế có tính khoa học và thực tiễn tiếp cận mục đích của từng gói khám:</p><ul><li>Phát hiện sớm các bệnh, kết hợp can thiệp điều trị cho người bệnh một cách toàn diện nhất.</li><li>Giúp tầm soát sớm các bệnh lý nguy hiểm, như bệnh tim mạch, bệnh chuyển hóa, ung thư.</li><li>Đội ngũ bác sĩ chuyên khoa, dày dặn kinh nghiệm trong việc khám phát hiện bệnh, tư vấn và kết hợp điều trị bệnh toàn diện.</li><li>Hệ thống trang thiết bị tiên tiết đạt tiêu chuẩn, giúp cho việc đánh giá và đưa ra chẩn đoán chính xác.</li><li>Hệ thống xét nghiệm đạt tiêu chuẩn quốc tế (đạt ISO 15189).</li></ul><p>Tại bệnh viện Vinmec ngoài khám sức khỏe tổng quát, còn có nhiều gói khám sức khỏe khác nhau cho phù hợp với mục đích khám và sàng lọc bệnh của mình như :</p><ul><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-tieu-chuan/"><b>Gói khám sức khỏe tổng quát tiêu chuẩn</b></a></li><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-dac-biet/"><b>Gói khám sức khỏe tổng quát đặc biệt</b></a></li><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-vip/"><b>Gói khám sức khỏe tổng quát VIP</b></a></li></ul><p>Tại <b>Bệnh viện Đa khoa Quốc tế Vinmec Hạ Long</b>, Quý khách hàng muốn khám sức khỏe, khám bệnh hoặc tiêm phòng xin vui lòng liên hệ qua số điện thoại: <b>02033 828 188.</b> Ấn phím <b>0</b> để đặt lịch khám chuyên khoa, ấn phím <b>2</b> để liên hệ tiêm vắc xin. Nhân viên khoa khám bệnh xin sẵn sàng phục vụ quý khách.</p><p>Để đặt lịch khám sức khỏe tổng quát trong <b>Hệ thống Y tế Vinmec trên toàn quốc</b>, quý khách vui lòng đặng kí khám trên website để được phục vụ.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        \n        <p>Để được tư vấn trực tiếp, Quý Khách vui lòng bấm số <a href="#" class="contact-button"><b>HOTLINE</b></a> hoặc đăng ký trực tuyến <a href="#" class="appointment-button"><b>TẠI ĐÂY</b></a>.</p>\n        \n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="place" object-id="10890" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="place" object-id="17265" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="place" object-id="67081" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="place" object-id="98367" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="place" object-id="98571" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="place" object-id="93245" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span><!-- <component-profile-widget object-type="place" object-id="28814" page-id=29284></component-profile-widget> -->\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span>\n    \n\n    \n\n    \n        \n\n        \n            \n\n            \n        \n    \n\n\n\n            \n                <div class="three-recent-list mobile">\n                    <b>XEM THÊM:</b>\n                    <ul>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/nguyen-nhan-va-dau-hieu-ung-thu-tuyen-giap/?link_type=related_posts" title="Nguyên nhân và dấu hiệu ung thư tuyến giáp" class="post-title">Nguyên nhân và dấu hiệu ung thư tuyến giáp</a>\n                            </li>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/chup-x-quang-co-anh-huong-gi-toi-suc-khoe-khong/?link_type=related_posts" title="Chụp X quang có ảnh hưởng gì tới sức khỏe không?" class="post-title">Chụp X quang có ảnh hưởng gì tới sức khỏe không?</a>\n                            </li>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/anh-huong-cua-tia-x-len-thai-nhi/?link_type=related_posts" title="Ảnh hưởng của tia X lên thai nhi" class="post-title">Ảnh hưởng của tia X lên thai nhi</a>\n                            </li>\n                        \n                    </ul>\n                </div>\n            \n        </div>',
    link:
      "https://vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nhung-dieu-can-luu-y-truoc-khi-kham-suc-khoe-tong-quat/",
    tag: [
      "Sản phụ khoa",
      "khám sức khỏe tổng quát",
      "Khám Tổng Quát",
      "Xét nghiệm",
      "Siêu âm ổ bụng",
      "Ung thư cổ tử cung",
      "Thin prep",
      "X Quang",
    ],
  },
  {
    id: "3WAJCnkBZLAYSuhRNgvz",
    title: "Khám thể lực là khám những gì?",
    body:
      '<div class="block-content cms pageview-highest">\n            \n\n\n\n    \n        <div><div class="rich-text"><p></p><p><b>Khám thể lực và đánh giá sức khỏe tổng quát là các bước quan trọng nhằm kiểm soát tình trạng sức khỏe của bản thân, giúp phát hiện sớm các bất thường để có hướng điều trị chính xác và hiệu quả.</b></p></div></div>\n    \n\n    \n\n    \n        \n            \n\n        \n\n        \n    \n\n    \n        <h2>1.    Khám thể lực là gì?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p></p><p><b>Khám thể lực</b> là một phần trong <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/vi-sao-khong-nen-tri-hoan-kham-suc-khoe-tong-quat/"><b>khám sức khỏe tổng quát</b></a>. Người bệnh sẽ được đo chiều cao, cân nặng để đánh giá <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chi-so-bmi-bao-nhieu-la-binh-thuong/"><b>chỉ số BMI</b></a>, đo huyết áp, nhịp tim. Ngoài ra, trong đánh giá sức khỏe tổng quát còn cần thực hiện một số các bước sau:</p><ul><li>Khám lâm sàng tổng quát: đánh giá cụ thể các hệ cơ quan như hô hấp, tuần hoàn, tiêu hóa, thần kinh, tiết niệu</li><li><a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/xet-nghiem-mau-co-cho-biet-nguy-co-mac-nhung-benh-gi/"><b>Xét nghiệm máu</b></a>, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/y-nghia-chi-so-asc-trong-xet-nghiem-nuoc-tieu/"><b>Xét nghiệm nước tiểu</b></a></li><li>Chẩn đoán hình ảnh: <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/22-cau-hoi-thuong-gap-ve-x-quang/"><b>chụp X-quang</b></a> các vị trí trên cơ thể, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/sieu-am-o-bung-la-sieu-am-nhung-bo-phan-nao/"><b>siêu âm ổ bụng</b></a></li><li>Thăm dò chức năng: <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/dien-tam-do-noi-len-dieu-gi/"><b>Điện tâm đồ</b></a>, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/do-dien-nao-do-phuong-phap-tam-soat-benh-som-o-nao/"><b>điện não đồ</b></a>, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cac-phuong-phap-do-mat-do-xuong-de-phat-hien-nguy-co-loang-xuong/"><b>đo loãng xương</b></a>.</li><li>Nam giới có thể mở rộng thêm <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/luu-y-truoc-khi-di-kham-nam-khoa/"><b>khám nam khoa</b></a>, nữ giới <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/kham-phu-khoa-la-kham-nhung-gi/"><b>khám phụ khoa</b></a> tùy nhu cầu nguyện vọng</li></ul><p>Người khám cần khai báo cụ thể về tiền sử mắc bệnh bản thân hoặc gia đình, đặc biệt là các bệnh có khả năng di truyền hoặc lây nhiễm thì nên thông báo rõ với bác sĩ để được khám chi tiết hơn.</p><p>Khám thể lực và <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/tai-sao-nen-kham-suc-khoe-dinh-ky/"><b>khám sức khỏe định kỳ</b></a> là cách chăm sóc sức khỏe toàn diện giúp phát hiện sớm ngay cả khi chưa có triệu chứng ở một số bệnh lý nguy hiểm từ đó nâng cao hiệu quả điều trị, giảm chi phí và thời gian chữa bệnh.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <figure class="post-image full">\n            \n                \n                <img class="full uploaded" v-lazy="\'https://vinmec-prod.s3.amazonaws.com/images/20191127_084043_607178_cong-thuc-bmi.max-1800x1800.png\'" alt="Công thức BMI" v-zoomable="50123">\n            \n\n            \n                <figcaption class="caption">\n                    <div class="rich-text">Khám thể lực để đánh giá chỉ số BMI của người bệnh</div>\n                </figcaption>\n            \n        </figure>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>2.    Nên khám thể lực và sức khỏe định kỳ ở độ tuổi nào?</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p></p><p>Ở mỗi độ tuổi khác nhau thì con người lại đối mặt với những nguy cơ bệnh lý khác nhau do đó việc khám sức khỏe định kỳ nên được thực hiện ở mọi lứa tuổi. Đây là việc làm cần thiết để bảo vệ sức khỏe và tránh các biến chứng nguy hiểm. Cụ thể như sau:</p><ul><li>Tuổi từ 0-16: nên được khám sức khỏe tổng quát mỗi năm 1-2 lần để tư vấn tiêm phòng, theo dõi chiều cao, cân nặng, tật khúc xạ và tâm sinh lý của trẻ.</li><li>Tuổi từ 18-25: thói quen sinh hoạt thiếu khoa học trong cuộc sống hiện đại khiến lứa tuổi này có nhiều nguy cơ mắc một số bệnh nguy hiểm. Khám sức khỏe là cách giúp nhận biết được tình trạng cơ thể và được tư vấn thay đổi trong chế độ ăn, thói quen sinh hoạt để ngăn ngừa bệnh tật</li><li>Tuổi từ 25-40: độ tuổi này thường sẽ kiểm tra hoạt động của gan, đo lường <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cholesterol-la-gi-co-may-loai-cholesterol/"><b>cholesterol</b></a> để biết nguy cơ về tim và <a href="https://www.vinmec.com/vi/benh/xo-vua-dong-mach-3030/"><b>xơ vữa động mạch</b></a>, ngăn ngừa <a href="https://www.vinmec.com/vi/benh/ung-thu-vu-2924/"><b>ung thư vú</b></a> ở phụ nữ.</li><li>Tuổi từ 40-60: cần thực hiện đo mật độ xương vì cơ thể đã bắt đầu có dấu hiệu lão hóa và có nhiều nguy cơ hơn với các loại bệnh tật nên việc thăm khám sức khỏe định kỳ lại càng trở nên cần thiết.</li></ul></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <figure class="post-image full">\n            \n                \n                <img class="full uploaded" v-lazy="\'https://vinmec-prod.s3.amazonaws.com/images/20191008_085513_509854_phan-biet-thoai-hoa.max-1800x1800.png\'" alt="Phân biệt loãng xương với thiếu xương" v-zoomable="50123">\n            \n\n            \n                <figcaption class="caption">\n                    <div class="rich-text">Người bệnh ngoài 40 tuổi cần đo mật độ xương trên cơ thể để phòng ngừa lão hóa</div>\n                </figcaption>\n            \n        </figure>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <h2>3.    Lưu ý khi tham gia khám thể lực và sức khỏe định kỳ</h2>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p></p><p>Một số điều cần lưu ý khi chuẩn bị tham gia khám sức khỏe định kỳ:</p><ul><li>Không ăn sáng, uống đồ uống có gas hoặc cà phê, trà để kết quả xét nghiệm máu và nước tiểu được chính xác</li><li>Nhịn ăn nếu cần phải <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/luu-y-truoc-khi-noi-soi-da-day/"><b>nội soi dạ dày</b></a></li><li>Nên uống nhiều nước và <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/sieu-am-o-bung-co-can-nhin-nhin-tieu/"><b>nhịn tiểu</b></a> khi cần siêu âm bụng tổng quát vì khi <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cac-benh-thuong-gap-o-bang-quang/"><b>bàng quang</b></a> đầy sẽ dễ quan sát được toàn bộ bàng quang, tử cung và hai buồng trứng (nữ giới) hoặc tuyến tiền liệt (nam giới)</li><li>Phụ nữ không khám phụ khoa nếu đang trong <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chu-ky-kinh-nguyet-duoc-tinh-nhu-nao/"><b>chu kỳ kinh nguyệt</b></a> hoặc có thai</li><li>Phụ nữ mang thai không chụp X-quang</li></ul><p>Tóm lại, khám sức khỏe định kỳ là một phương pháp hiệu quả nhằm sàng lọc và phát hiện sớm các nguy cơ bệnh tật đối với cơ thể để đưa ra hướng xử trí thích hợp.</p><p>Hệ thống Y tế Vinmec đã từ lâu nổi tiếng với cơ sở vật chất hiện đại, đạt chuẩn nổi bật với nguồn nhân lực chất lượng cao và được thực hiện bởi các các chuyên gia, bác sĩ đầu ngành được đào tạo bài bản ở cả trong và ngoài nước. Bên cạnh đó, để đáp ứng nhu cầu thăm khám, điều trị, chẩn đoán và phòng ngừa bệnh, hiện nay Vinmec còn triển khai nhiều dịch vụ y tế tiện ích đi kèm được rất nhiều Quý khách hàng hài lòng.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <figure class="post-image full">\n            \n                \n                <img class="full uploaded" v-lazy="\'https://vinmec-prod.s3.amazonaws.com/images/20190910_135136_529584_phu-nu-nen-kham-din.max-1800x1800.png\'" alt="Phụ nữ nên khám định kỳ bệnh gì" v-zoomable="50123">\n            \n\n            \n                <figcaption class="caption">\n                    <div class="rich-text">Hệ thống Y tế Vinmec đang triển khai cung cấp nhiều gói khám sức khỏe định kỳ cho khách hàng</div>\n                </figcaption>\n            \n        </figure>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <div class="rich-text"><p></p><p>Hiện tại, Bệnh viện Đa khoa Quốc tế Vinmec đã và đang tiếp tục đầu tư đổi mới trang thiết bị hiện đại, đồng thời ứng dụng khoa học kỹ thuật, phương pháp điều trị y học mới nhất vào điều trị. Vì thế, Bệnh viện Đa khoa Quốc tế Vinmec được đánh giá là địa chỉ chăm sóc y tế tiêu chuẩn quốc tế tại Việt Nam.</p><p>Hiện tại, Vinmec đang triển khai rất nhiều <a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/"><b>gói khám sức khỏe định kỳ</b></a> phù hợp với từng độ tuổi, giới tính và nhu cầu riêng của khách hàng với chính sách giá rất ưu đãi, bao gồm:</p><ul><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-work-permit-cap-giay-phep-lao-dong/?link_type=related_posts"><b>Gói khám sức khỏe tổng quát Work permit- cấp giấy phép lao động</b></a></li><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-tre-em/"><b>Gói khám sức khỏe tổng quát trẻ em</b></a></li><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-tieu-chuan/"><b>Gói khám sức khỏe tổng quát tiêu chuẩn</b></a></li><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-dac-biet/?link_type=related_posts"><b>Gói khám sức khỏe tổng quát đặc biệt</b></a></li><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-vip/?link_type=related_posts"><b>Gói khám sức khỏe tổng quát VIP</b></a></li><li><a href="https://www.vinmec.com/vi/goi-dich-vu/kham-suc-khoe-tong-quat/goi-kham-suc-khoe-tong-quat-kim-cuong/?link_type=related_posts"><b>Gói khám sức khỏe tổng quát kim cương</b></a></li></ul><p>Ưu điểm của các gói khám sức khỏe của Vinmec là quý khách hàng sẽ được đánh giá tổng thể các chỉ số của cơ thể, theo dõi tình trạng sức khỏe, sàng lọc, tầm soát sức khỏe bởi hệ thống trang thiết bị hiện đại giúp hỗ trợ chuẩn đoán tốt nhất hiện nay như máy PET/CT, MRI, CT 640, hệ thống máy siêu âm tiên tiến hàng đầu thế giới, hệ thống labo xét nghiệm tiêu chuẩn quốc tế,... Sau khi khám tổng quát, nếu phát hiện các bệnh lý, quý khách hàng có thể sử dụng dịch vụ từ các chuyên khoa khác tại bệnh viện với chất lượng điều trị vượt trội.</p><p>Quý khách hàng có thể gọi đến <a href="https://www.vinmec.com/vi/danh-sach/ca-nuoc/coso-benh-vien-v-phong-kham/?page=1"><b>hotline các bệnh viện</b></a> hoặc đăng ký tư vấn trực tuyến với Vinmec <a href="https://www.vinmec.com/vi/dat-kham/"><b>TẠI ĐÂY</b></a>.</p></div>\n    \n\n    \n\n    \n        \n\n        \n    \n\n    \n        <span></span>\n    \n\n    \n\n    \n        \n\n        \n            \n\n            \n        \n    \n\n\n\n            \n                <div class="three-recent-list mobile">\n                    <b>XEM THÊM:</b>\n                    <ul>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/tre-em-can-kiem-tra-nhung-gi-khi-kham-suc-khoe-tong-quat/?link_type=related_posts" title="Trẻ em cần kiểm tra những gì khi khám sức khỏe tổng quát?" class="post-title">Trẻ em cần kiểm tra những gì khi khám sức khỏe tổng quát?</a>\n                            </li>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/9-cau-hoi-thuong-gap-khi-mua-goi-kham-suc-khoe-tong-quat/?link_type=related_posts" title="9 câu hỏi thường gặp khi mua gói khám sức khỏe tổng quát" class="post-title">9 câu hỏi thường gặp khi mua gói khám sức khỏe tổng quát</a>\n                            </li>\n                        \n                            <li>\n                                <a href="/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/kiem-tra-sac-giac-la-gi/?link_type=related_posts" title="Kiểm tra sắc giác là gì?" class="post-title">Kiểm tra sắc giác là gì?</a>\n                            </li>\n                        \n                    </ul>\n                </div>\n            \n        </div>',
    link:
      "https://vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/kham-luc-la-kham-nhung-gi/",
    tag: [
      "Chẩn đoán hình ảnh",
      "Tầm soát ung thư",
      "Gói khám sức khỏe tổng quát",
      "Khám thể lực",
      "khám sức khỏe tổng quát",
      "Khám sức khỏe định kỳ",
    ],
  },
];

export type NewsDialogType = "close" | "edit" | "view";

const NewsList = () => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState<NewsDialogType>("close");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const closeDialog = () => {
    setDialogOpen("close");
  };
  const toggleConfirmDialog = () => {
    setConfirmDialogOpen(!confirmDialogOpen);
  };
  const editButtonClicked = (row: any) => {
    setSelectedRow(row);
    setDialogOpen("edit");
  };

  const deleteButtonClicked = (row: any) => {
    setSelectedRow(row);
    setConfirmDialogOpen(true);
  };
  const account = useSelector((state: any) => state.loginAccount?.account);
  const newsList: any[] = useSelector((state: any) => state.news?.news) || [];
  // const newsList = mockData;

  const isAdmin = useMemo(() => account.roleId === RoleIDs.ROLE_ADMIN, [
    account,
  ]);

  const {
    totalPages,
    totalEntries,
    currentPage,
    pageSize,
    searchData,
    type,
  } = useSelector((state: any) => state.news);

  const dispatch = useDispatch();

  const dispatchNewsList = (paginationData: any) =>
    dispatch(getNewsList(type, searchData, paginationData, account.token));
  const dispatchDeleteNews = (deletedRecords: string[]) => {
    const data = {
      ids: deletedRecords,
    };
    dispatch(deleteNews(data, account.token));
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    const paginationData = { page: value, size: pageSize };
    dispatchNewsList(paginationData);
  };
  return (
    <>
      <Grid container direction="row" alignItems="center">
        {totalEntries > 0 && (
          <Typography variant="subtitle2" style={{ marginBottom: 12 }}>
            Số kết quả tìm được: {totalEntries || 0}
          </Typography>
        )}

        {totalEntries === 0 && searchData !== null && (
          <Typography variant="subtitle2" style={{ marginBottom: 12 }}>
            Không tìm được kết quả nào
          </Typography>
        )}
      </Grid>
      {newsList.length > 0 && (
        <Grid container spacing={4}>
          {newsList.map((row) => (
            <Grid item key={row.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                {/* <Link to="/">
            <CardMedia
              className={classes.cardMedia}
              image="https://source.unsplash.com/random"
              title="Image title"
            />
          </Link> */}
                <CardContent className={classes.cardContent}>
                  <Link
                    href={row.link}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Typography variant="h6">{row.title}</Typography>

                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      color="primary"
                    >
                      {getDomainFromUrl(row.link)}
                    </Typography>
                    <Typography variant="body2">
                      <b>{"Từ khoá liên quan: "}</b>
                      {displayTags(row.tag)}
                    </Typography>
                  </Link>
                </CardContent>
                {isAdmin && (
                  <CardActions disableSpacing>
                    <Tooltip title="Sửa đổi" aria-label="add">
                      <IconButton onClick={() => editButtonClicked(row)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xoá" aria-label="add">
                      <IconButton onClick={() => deleteButtonClicked(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} style={{ marginTop: 12 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChange}
            />
          </Grid>
          <CustomizedDialog
            open={dialogOpen === "edit"}
            title="Sửa thông tin tin tức"
            content={
              <NewsDetailEdit row={selectedRow} closeDialog={closeDialog} />
            }
            toggleDialog={closeDialog}
            maxWidth="md"
          />
          <ConfirmDialog
            open={confirmDialogOpen}
            toggleDialog={toggleConfirmDialog}
            content={<div>Bạn có chắc chắn muốn xoá?</div>}
            onYesButtonClicked={() => dispatchDeleteNews([`${selectedRow.id}`])}
            onNoButtonClicked={toggleConfirmDialog}
          />
        </Grid>
      )}
    </>
  );
};

export default React.memo(NewsList);

import {HTMLElement} from "node-html-parser";
import Announcement from "./announcement";

export default function parseAnnouncements (page: HTMLElement) {
    let announcements = new Array<Announcement>();
    page.querySelector("div.clearfix.inner-items-container")?.querySelectorAll("div.description-wrapper").forEach(announcementDiv => {
        let announcementDates = announcementDiv.querySelector("p.date")?.text.split('–').map(strDate => strDate.trim());
        let announcementName = announcementDiv.querySelector("h4")?.text;

        if (announcementName && announcementDates) {
            announcements.push({
                name: announcementName,
                dateStart: announcementDates[0].toString(),
                dateEnd: announcementDates[1].toString(),
                paragraphs: announcementDiv.querySelectorAll("p:not(.date):not(.description)").map(paragraph => paragraph.text)
            })
        }
    });

    return announcements;
}
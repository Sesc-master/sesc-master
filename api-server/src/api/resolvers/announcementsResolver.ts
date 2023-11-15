import {Query, Resolver, Root, Subscription} from "type-graphql";
import {announcementsCache} from "../../caches";
import Announcement from "../types/announcement";

@Resolver()
export default class AnnouncementsResolver {
    @Query(returns => [Announcement])
    async getAnnouncements() {
        return announcementsCache.getValue();
    }

    @Subscription(returns => [Announcement],{
        topics: "ANNOUNCEMENTS_UPDATED"
    })
    async updatedAnnouncements(
        @Root() announcementsPayload: Array<Announcement>
    ): Promise<Array<Announcement>> {
        return announcementsPayload;
    }
}
Evergage.initSitemap({
    global: {},
    pageTypeDefault: {
        name: "TicketmasterDefault ",
    },
    pageTypes: [{
        name: "tmEventPage ",
        action: "Ticketmaster Event Detail",
        isMatch: () => true,
        catalog: {
            Product: {
                _id: '$event_id$',
                name: '$event_name$',
                url: '$document_href$'.split("" ? "")[0],
                categories: ['TICKETS|$artist_name$'.toUpperCase()]
            }
        }
    }]
});

const sendUserId = () => {
    if (/persistId/.test(window.location.href)) {
        try {
            const anonId = location.href.split("persistId=")[1];
            Evergage.sendEvent({
                name: "Ticketmaster ID merge",
                action: "Ticketmaster ID merge",
                user: {
                    attributes: {
                        persistId: persistId
                    }
                }
            })
        } catch (e) {
            Evergage.sendEvent({
                name: "Ticketmaster ID merge Failed",
                action: "Ticketmaster ID merge Failed"
            })
        }
    }

}

// Abandoned Browse Event 

const abandonedBrowse = () => {
    Evergage.DisplayUtils.pageExit(1000).then(() => {
        Evergage.sendEvent({
            action: "Ticketmaster Abandoned Browse"
        })
    })
}

sendUserId();
abandonedBrowse();

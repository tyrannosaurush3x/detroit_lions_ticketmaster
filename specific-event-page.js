let timerVar = setInterval(() => {
    if (typeof Evergage != 'undefined') {
        clearInterval(timerVar);
        Evergage.init({

        }).then(() => {
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
        });
        const sendUserId = () => {
            if (/persistUserId/.test(window.location.href)) {
                try {
                    const anonId = location.href.split("persistUserId=")[1];
                    Evergage.sendEvent({
                        name: "Ticketmaster ID merge",
                        action: "Ticketmaster ID merge",
                        user: {
                            attributes: {
                                persistId: anonId
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
        sendUserId();
    }
}, 2000)

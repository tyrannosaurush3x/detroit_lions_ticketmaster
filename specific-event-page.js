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
                    itemAction: Evergage.ItemAction.ViewCart,
                    catalog: {
                        Product: {
                            lineItems: {
                                _id: ['$event_id$'],
                                price: [100],
                                quantity: [1]
                            }
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
        
        const sendProdView = () => {
            Evergage.sendEvent({
                itemAction: Evergage.ItemAction.ViewItem,
                action: "View Item",
                catalog: {
                    Product: {
                        _id: '$event_id$',
                        name: '$event_name$',
                        categories: ['TICKETS|$artist_name$'.toUpperCase()]
                    }
                }
            })
        }

        sendProdView();
        sendUserId();
    }
}, 2000)

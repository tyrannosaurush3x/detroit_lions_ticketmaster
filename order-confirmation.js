let timerVar = setInterval(() => {
    if (typeof Evergage != 'undefined') {
        clearInterval(timerVar);
        Evergage.init({

        }).then(() => {
            Evergage.initSitemap({
                global: {},
                pageTypeDefault: {
                    name: 'TicketmasterDefault',
                },
                pageTypes: [{
                    name: 'tmOrder',
                    action: 'Ticketmaster Order Confirmation',
                    isMatch: () => true,
                    itemAction: Evergage.ItemAction.Purchase,
                    order: {
                        Product: {
                            orderId: '$order_id$',
                            totalValue: '$face_value$',
                            lineItems: {
                                _id: ['$event_id$'],
                                price: [($face_value$ / $ticket_quantity$).toFixed(2)],
                                quantity: [$ticket_quantity$]
                            }
                        }
                    }
                }],
            });
        });
        const sendUserId = () => {
            if (/persistUserId/.test(window.location.href)) {
                try {
                    const anonId = location.href.split("persistUserId=")[1].split('&')[0];
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

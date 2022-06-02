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
                    action: "Ticketmaster Checkout Page",
                    isMatch: () => true,
                }]
            });
        })

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

        // Add to cart Event

        const sendAddToCart = () => {
            Evergage.sendEvent({
                itemAction: Evergage.ItemAction.AddToCart,
                action: "Add To Cart",
                cart: {
                    singleLine: {
                        Product: {
                            _id: '$event_id$',
                            price: '$event_name$',
                            quantity: '$ticket_quantity$'
                        }
                    }
                }
            })
        }

        sendAddToCart();
        sendUserId();
    }
}, 2000)

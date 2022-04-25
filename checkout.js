Evergage.initSitemap({
    global: {},
    pageTypeDefault: {
        name: "TicketmasterDefault ",
    },
    pageTypes: [{
        name: "tmEventPage ",
        action: "Ticketmaster Checkout Page",
        isMatch: () => true,
        listeners: [
            Evergage.listener("click", "button[name='sign-in']", () => {
                const emailAddress = $("input[name='email']").value;
                Evergage.sendEvent({
                    name: "Ticketmaster Sign-in",
                    action: "Ticketmaster Sign-in",
                    user: {
                        attributes: {
                            emailAddress: emailAddress
                        }
                    }
                })
            }), 
            Evergage.listener("submit", "button[type='submit']", () => {
                //TODO Sign up click 
            })
        ]
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

// Abandoned Browse Event 

const abandonedBrowse = () => {
    Evergage.DisplayUtils.pageExit(1000).then(() => {
        Evergage.sendEvent({
            action: "Ticketmaster Abandoned Cart"
        })
    })
}

sendAddToCart();
sendUserId();
abandonedBrowse();

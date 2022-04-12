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
    }, ],
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

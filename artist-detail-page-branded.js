let timerVar = setInterval(() => {
    if (typeof Evergage != 'undefined') {
        
        Evergage.init({
   
        }).then(() => {
              
            Evergage.initSitemap({
                global: {},
                pageTypeDefault: {
                    name: "TicketmasterDefault",
                },
                pageTypes: [{
                    name: "tmArtistPageBranded",
                    action: "Ticketmaster Artist Branded",
                    isMatch: () => true,
                }]
            });   // Initializes the Sitemap
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

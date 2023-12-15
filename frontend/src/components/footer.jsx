import React from "react";

function Footer() {

    //footer component exported and inported in all route pages
    return (
        <div>
            <footer className="myFooter">
                <img src="https://w0.peakpx.com/wallpaper/458/671/HD-wallpaper-instagram-red-logo-red-neon-lights-creative-red-abstract-background-instagram-logo-social-network-instagram.jpg" height={80} width={20}></img>
                <img src="https://e0.pxfuel.com/wallpapers/916/270/desktop-wallpaper-facebook-red-logo-red-neon-lights-creative-red-abstract-background-facebook-logo-social-network-facebook.jpg" height={80} width={20}></img>
                Johannesvägen 88, Jonköping.
                <br />
                BioPalatset.cinema@email.com
                <br />
            </footer>
        </div>
    )
}

export default Footer;
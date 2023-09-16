import React from 'react';
import styles from "./homePage.module.css"
import Intro from "./intro/intro";
import Autopark from "./autopark/autopark";
import Contact from "./contact/contact";

export function HomePage() {

    return (
        <div className={styles.homePageContainer}>
            <Intro />
            <Autopark />
            <Contact />
        </div>
    );
}

export default HomePage;
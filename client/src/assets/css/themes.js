import { createGlobalStyle } from "styled-components";

export const defaultTheme = {
    color: "#272",
}

export const newTheme = {
    c1: "#6f2f2f",
    c2: "#222",
    c3: "#311",
    button: {
        c1: "#733",
        c2: "#511",
    },
    weakButton: {
        c1: "#fff",
        c2: "#eee",
    },
}

export const GlobalStyles = createGlobalStyle`
    .navbar, .bg-none {
        background-color: transparent!important;
    }

    a {
        text-decoration: none;
    }

    #banner {
        width: 100%;
    }

    .bg-theme {
        background-color: ${(props) => props.theme.c3};
    }

    body { 
        background-image: url("/assets/images/thumbnails/bg.png");
        background-size: 100% 100%;
        background-position: top;
        background-repeat: no-repeat;
        background-color: #333;
    }

    .btn-block {
        display: block;
        width: 100%;
        min-height: 100%;
    }

    .btn-theme {
        color: #fff;
        background-color: ${(props) => props.theme.button.c1};
        border: none;
    }

    .btn-theme:hover {
        color: #fff;
        background-color: ${(props) => props.theme.button.c2};
        border: none;
    }

    .btn-weak {
        color: #000;
        background-color: ${(props) => props.theme.weakButton.c1};
        border: 0.1rem solid;
        border-color: #ccc!important;
    }

    .btn-weak:hover {
        color: #000;
        background-color: ${(props) => props.theme.weakButton.c2};
        border: 0.1rem solid;
        border-color: #ccc!important;
    }

    .card-title {
        font-weight: 600;
    }

    .font-poppins {
        font-family: 'Poppins', sans-serif;
    }

    #footer-img {
        width: 70%;
    }

    #footer-supreme {
        border: none!important;
    }

    .link-theme {
        color: ${(props) => props.theme.button.c1};
    }

    .link-theme:hover {
        color: ${(props) => props.theme.button.c2};
    }

    img {
        max-width: 100%;
    }

    .mainBody {
        min-height: 67vh;
    }

    .mobile-share {
        background-color: transparent;
        font-size: 1.7rem;
    }

    #myInput {
        width: 100%;
    }

    .navbar, .footer {
        width: 100%!important;
    }

    .navbar-brand {
        max-width: 7%;
    }

    .navbar-dark .nav-link {
        color: white!important;
    }

    .navbar-dark .nav-link:hover {
        color: white!important;
    }

    .hoverable {
        border-top: 0.15rem solide;
        border-bottom: 0.15rem solid;
        border-color: white;
    }

    .hoverable:hover {
        border-bottom-color: transparent;
        transition: all 0.5s ease;
    }

    .quote-body, .quote-preview {
        font-weight: 500;
    }

    #quote-page {
        background-image: url("/assets/images/thumbnails/background.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #F8F8F5;
    }

    .smaller-text {
        font-size: 14px;
        font-weight: 650;
    }

    .share-button {
        font-size: 1.8rem;
        transition: all 0.4s ease;
    }

    #share-twitter {
        color: #1DA1F2 !important;
    }

    #share-twitter:hover {
        color: #0d476b !important;
    }

    #share-facebook {
        color: #4867AA !important;
    }

    #share-facebook:hover {
        color: #1c315e !important;
    }

    #share-reddit {
        color: #fc5011 !important;
    }

    #share-reddit:hover {
        color: #782c10 !important;
    }
`
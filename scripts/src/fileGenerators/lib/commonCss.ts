import { pageBackgroundColor } from "./siteConstants";

export const commonCSS = `
body {
    background-color: ${pageBackgroundColor};
    color: #eceff1;
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

a:link {
    color: #90CAF9;
}

a:visited {
    color: #E1BEE7;
}

.fit {
    width: -moz-fit-content;
    width: fit-content;
}

.added {
  background-color: green;
}

.removed {
  background-color: red;
}




  .hamburger-button {

  }

  .nav-button{
    border: none;
    background: none;
    padding: 0px;
    color: #90CAF9;
    font-size: 24px;
    margin: 0px;
  }

  .wide-nav {
    display: none;
  }

  .splash-code {
    position: absolute;
  }
  .center-title {

  }
  .wide-title{
    display: none;
  }
  .center-title {

  }

  .code-box{
    margin-top:0;
    margin-bottom:25px;
    padding-top:15px;
    padding-bottom:15px;
  }

  @media (min-width: 300px){
    .padded {
      padding-left: 15px;
      padding-right: 15px;
    }

    .code-box{
      border-radius:10px;
      box-shadow:4px 6px 5px 0px #000000;
      padding-left:5px;
      padding-right:5px;
    }
  }

  @media (min-width: 350px) {
    .code-box{
      border-radius:10px;
     
      padding-left:30px;
      padding-right:30px;
     
      
    }
  }
  
  @media (min-width: 520px) {
    .splash-code {
      position: relative;
    }
    .dance {
      height: 600px;
    }

    .wide-nav {
      display: flex;
    }
    .wide-title {
      display: unset;
    }
    .center-title {
      display: none;
    }

    .hamburger-button {
      display: none;
    }

    .padded {
      padding-left: 50px;
      padding-right: 50px;
    }
  }
  #snow-header-button{
    transition: all 0.3s linear;
  }


  /* PrismJS 1.22.0
  https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+clike+javascript+jsx */
  /**
   * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML
   * Based on https://github.com/chriskempson/tomorrow-theme
   * @author Rose Pritchard
   */
  
  code[class*="language-"],
  pre[class*="language-"] {
    color: #ccc;
    background: none;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
  
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  
  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #2d2d2d;
  }
  
  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  
  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #b2b2b2;
  }
  
  .token.punctuation {
    color: #88c6be;
  }
  
  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: #fc929e;
  }
  
  .token.function-name {
    color: #6196cc;
  }
  
  .token.boolean,
  .token.number {
    color: #ff8b50;
  }
  
  .token.function {
    color: #79b6f2;
  }
  
  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: #fac863;
  }
  
  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #c5a5c5;
  }
  
  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex {
    color: #8dc891;
  }
  
  .token.variable {
    color: #d7deea;
  }
  
  .token.operator,
  .token.entity,
  .token.url {
    color: #fc929e;
  }
  
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  
  .token.entity {
    cursor: help;
  }
  
  .token.inserted {
    color: green;
  }
  .token.melon {
    color: #34FF79;
  }
  .token.cheese {
    color: #4F7EFF;
  }
  .token.lemon {
    color: #3CE8FF;
  }
  
  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #5a9bcf;
  }
  

`;

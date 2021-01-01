
import ReactDomServer from "react-dom/server";
/**
 * 
 */
export default (element: JSX.Element) => {
  let style: string | null = null;
  const all = ReactDomServer.renderToString(element)
  all.replace(
    /style="([^"]+)"/,
    (_, styleString, ) => {
      style = styleString;
      return "";
    }
  );
  return style
};

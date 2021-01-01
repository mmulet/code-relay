import React from "react";
import { commonCSS } from "./lib/commonCss";
import FileGenerator from "./lib/FileGenerator";
import { terms } from "./lib/fileNames";
import Page from "./lib/Page";

const output: FileGenerator = {
  fileType: "html",
  fileName: terms,
  title: "code relay - Terms of Service",
  head: `
  <style>
  ${commonCSS}
  </style>
  `,
  component: () => (
    <Page>
      <div className="terms-page-margin">
        <h2>Code Relay Terms of Service</h2>
        <h3>1. Terms</h3>
        <p>
          By accessing the website at
          <a href="https://coderelay.io">https://coderelay.io</a>, you are
          agreeing to be bound by these terms of service, all applicable laws
          and regulations, and agree that you are responsible for compliance
          with any applicable local laws. If you do not agree with any of these
          terms, you are prohibited from using or accessing this site. The
          materials contained in this website are protected by applicable
          copyright and trademark law.
        </p>
        <h3>2. Use License</h3>
        <ol type="a">
          <li>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on Late for Dinner Studios,
            LLC's website for personal, transitory viewing only. This is the
            grant of a license, not a transfer of title, and under this license
            you may not:
            <ol type="i">
              <li>modify or copy the materials;</li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on Late for Dinner Studios, LLC's website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ol>
          </li>
          <li>
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by Late for Dinner Studios,
            LLC at any time. Late for Dinner Studios, LLC may disallow your
            access to https://coderelay.io if you violate any of these
            restrictions or if Late for Dinner Studios, LLC is investigating any
            suspected violation. Upon terminating your viewing of these
            materials or upon the termination of this license, you must destroy
            any downloaded materials in your possession whether in electronic or
            printed format.
          </li>
        </ol>
        <h3>3. Disclaimer</h3>
        <ol type="a">
          <li>
            The materials on Late for Dinner Studios, LLC's website are provided
            on an 'as is' basis. Late for Dinner Studios, LLC makes no
            warranties, expressed or implied, and hereby disclaims and negates
            all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </li>
          <li>
            Further, Late for Dinner Studios, LLC does not warrant or make any
            representations concerning the accuracy, likely results, or
            reliability of the use of the materials on its website or otherwise
            relating to such materials or on any sites linked to this site.
          </li>
        </ol>
        <h3>4. Limitations</h3>
        <p>
          In no event shall Late for Dinner Studios, LLC or its suppliers be
          liable for any damages (including, without limitation, damages for
          loss of data or profit, or due to business interruption) arising out
          of the use or inability to use the materials on Late for Dinner
          Studios, LLC's website, even if Late for Dinner Studios, LLC or a Late
          for Dinner Studios, LLC authorized representative has been notified
          orally or in writing of the possibility of such damage. Because some
          jurisdictions do not allow limitations on implied warranties, or
          limitations of liability for consequential or incidental damages,
          these limitations may not apply to you.
        </p>
        <h3>5. Accuracy of materials</h3>
        <p>
          The materials appearing on Late for Dinner Studios, LLC website could
          include technical, typographical, or photographic errors. Late for
          Dinner Studios, LLC does not warrant that any of the materials on its
          website are accurate, complete or current. Late for Dinner Studios,
          LLC may make changes to the materials contained on its website at any
          time without notice. However Late for Dinner Studios, LLC does not
          make any commitment to update the materials.
        </p>
        <h3>6. Links</h3>
        <p>
          Late for Dinner Studios, LLC has not reviewed all of the sites linked
          to its website and is not responsible for the contents of any such
          linked site. The inclusion of any link does not imply endorsement by
          Late for Dinner Studios, LLC of the site. Use of any such linked
          website is at the user's own risk.
        </p>
        <h3>7. Modifications</h3>
        <p>
          Late for Dinner Studios, LLC may revise these terms of service for its
          website at any time without notice. By using this website you are
          agreeing to be bound by the then current version of these terms of
          service.
        </p>
        <h3>8. Governing Law</h3>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of Minnesota and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>
      </div>
    </Page>
  ),
};

export default output;

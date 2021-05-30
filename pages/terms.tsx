import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
import { MUX_HOME_PAGE_URL, MUX_TERMS_URL } from "../constants";

const Terms: React.FC<NoProps> = () => {
  return (
    <Layout title="stream.new terms" backNav>
      <div className="terms">
        <h1>Terms</h1>
        <p>
          This uploader may only be used for videos to be submitted to the{" "}
          <Link href="https://remotion.dev/showcase">Remotion Showcase</Link>.
        </p>
        <p>
          All other videos will be deleted and in general we reserve the right
          to remove any videos at our discretion.
        </p>
      </div>
      <style jsx>
        {`
          h1 {
            text-align: center;
            margin-top: 40px;
          }
          .terms {
            max-width: 800px;
            margin: 0 auto;
          }
        `}
      </style>
    </Layout>
  );
};

export default Terms;

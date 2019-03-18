import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import KonvaComponent from "../components/konva/konva";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>React Konva Test</h1>
    <KonvaComponent />
  </Layout>
)

export default IndexPage

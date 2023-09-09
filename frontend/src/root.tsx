// @refresh reload
import { Suspense } from "solid-js"
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from "solid-start"
import "./root.css"
import { SDKProvider } from "@twa.js/sdk-solid"
import { DisplayGate } from "@contexts/TWA"
import { GameProvider } from "@contexts/Game"

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Sea Battle</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <SDKProvider initOptions={{ debug: true, cssVars: true }}>
          <DisplayGate>
            <GameProvider>
              <Suspense>
                <ErrorBoundary>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </ErrorBoundary>
              </Suspense>
            </GameProvider>
          </DisplayGate>
        </SDKProvider>
        <Scripts />
      </Body>
    </Html>
  )
}

import { createMemo, Match, ParentProps, Switch } from "solid-js"
import { useSDKContext } from "@twa.js/sdk-solid"

export function DisplayGate(props: ParentProps) {
  const { loading, error } = useSDKContext()
  const errorMessage = createMemo<null | string>(() => {
    const err = error()

    if (!err) return null

    return err instanceof Error ? err.message : "Unknown error"
  })

  return (
    <Switch fallback={props.children}>
      <Match when={errorMessage()}>
        <p>
          SDK was unable to initialize. Probably, current application is being
          used not in Telegram Web Apps environment.
        </p>
        <blockquote>
          <p>{errorMessage()}</p>
        </blockquote>
      </Match>
      <Match when={loading()}>
        <div>Loading..</div>
      </Match>
    </Switch>
  )
}

<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card/index.js'
  import * as Alert from '$lib/components/ui/alert/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
  import { preventDefault } from '$lib/utils'

  let username = $state('')
  let password = $state('')
  let endpoint = $state('')

  function isNotEmpty(value: string | null | undefined) {
    return value != null && value.trim().length > 0
  }

  let isValid = $derived(
    isNotEmpty(username) && isNotEmpty(password) && isNotEmpty(endpoint),
  )

  let { error, onLogin } = $props()

  let onSubmit = () => {
    if (isValid) {
      onLogin({ username, password, endpoint })
    }
  }
</script>

<div class="flex pt-24 justify-center w-full">
  <form action="POST" onsubmit={preventDefault(onSubmit)}>
    <Card.Root class="w-full max-w-sm">
      <Card.Header>
        <Card.Title class="text-2xl">Connect to database</Card.Title>
        <Card.Description
          >Enter your credentials below to access your SQLite database.</Card.Description
        >
      </Card.Header>
      <Card.Content class="grid gap-4">
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="username"
            placeholder="admin"
            required
            bind:value={username}
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            bind:value={password}
          />
        </div>
        <div class="grid gap-2">
          <Label for="endpoint">Endpoint</Label>
          <Input
            id="endpoint"
            name="endpoint"
            type="text"
            placeholder="https://myserver.com/admin"
            required
            bind:value={endpoint}
          />
        </div>
      </Card.Content>
      <Card.Footer class="flex-wrap space-y-4">
        <Button type="submit" class="w-full" disabled={!isValid}>Connect</Button
        >
        {#if error}
          <Alert.Root variant="destructive">
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Root>
        {/if}
      </Card.Footer>
    </Card.Root>
  </form>
</div>
<p class="mt-4 mx-auto px-8 max-w-sm">
  For information on how to use this tool checkout the <a
    class="underline"
    href="https://github.com/joelseq/sqliteadmin-go"
    target="_blank">README</a
  >.
</p>

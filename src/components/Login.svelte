<script lang="ts">
  import { getConfig } from "../lib/fusionauth";

  export let session: any;
  console.log(session);
  const login = () => {
    const config = getConfig();
    window.location.href = `${config.url}/oauth2/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${window.location.origin}/oauth-redirect&scope=offline_access&state=${session.stateValue}&code_challenge=${session.challenge}&code_challenge_method=S256`;
  };
  const logout = () => {
    window.location.href = "/logout";
  };
</script>

{#if session.user}
  <div class="flex flex-col gap-8">
    <div class="flex flex-col card bg-primary p-8">
      <div class="text-3xl bold">{session.user.firstName}</div>
      <div class="text-xl flex gap-2">
        <div>Email:</div>
        <div>{session.user.email}</div>
      </div>
    </div>
    <div>
      <button class="btn" on:click={() => logout()}>Logout</button>
    </div>
  </div>
{:else}
  <div class="flex">
    <button class="btn" on:click={() => login()}>Login</button>
  </div>
{/if}

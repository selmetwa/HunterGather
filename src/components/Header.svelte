  <script>
    // @ts-nocheck
    import { page } from '$app/stores';
	  import { enhance } from "$app/forms";
	  import { supabaseClient } from "$lib/supabase";

    const submitLogout = async ({ cancel }) => {
     const { error } = await supabaseClient.auth.signOut();
      
     cancel();
   }

  
    console.log({ $page });
    const activeSession = $page?.data?.session;
    let userId = $page?.data?.session?.user?.id;
  </script>
  <nav class="bg-blue-500 border-gray-200 px-2 sm:px-4 py-2.5">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="/" class="flex items-center">
          <span class="text-gray-200 self-center text-xl font-semibold whitespace-nowrap">wwwabbit</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
          {#if activeSession}
          <li class="block py-2 pl-3 pr-4 text-gray-200 rounded md:border-0 md:hover:text-gray-300 md:p-0 ease-in-out duration-300">
            <form action="/logout" method="POST">
              <button type="submit" text="logout" class="font-bold font-sans">Logout</button>
            </form>
          </li>
          <li>
            <a href={`/profile/${userId}`} class="block py-2 pl-3 pr-4 text-gray-200 rounded md:border-0 md:hover:text-gray-300 md:p-0 ease-in-out duration-300">
              <i class="fa-solid fa-user"></i>
            </a>
          </li>
          {:else}
            <li>
              <a href="/login" class="block py-2 pl-3 pr-4 text-gray-200 rounded md:border-0 md:hover:text-gray-300 md:p-0 ease-in-out duration-300">Login</a>
            </li>
            <li>
              <a href="/register" class="block py-2 pl-3 pr-4 text-gray-200 rounded md:border-0 md:hover:text-gray-300 md:p-0 ease-in-out duration-300">Register</a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>
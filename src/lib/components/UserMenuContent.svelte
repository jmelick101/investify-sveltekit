<script lang="ts">
    import UserInfo from '$lib/components/UserInfo.svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import type { User } from '$lib/types';
    // Link and router replaced with native elements and goto
    import { LogOut, Settings } from 'lucide-svelte';
    import IncognitoToggle from './user/IncognitoToggle.svelte';


    interface Props {
        user: User;
    }

    let { user }: Props = $props();

    const handleLogout = () => {
        router.flushAll();
    };
</script>

<DropdownMenu.Label class="p-0 font-normal">
    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <UserInfo {user} showEmail={true} showGroup={true} />
    </div>
</DropdownMenu.Label>
<DropdownMenu.Separator />
<DropdownMenu.Group>
    <DropdownMenu.Item>
        <Link class="block w-full" href={route('user.profile.edit')} prefetch as="button">
            <div class="flex items-center">
                <Settings class="mr-2 size-4" />
                <span>Settings</span>
            </div>
        </Link>
    </DropdownMenu.Item>
</DropdownMenu.Group>
<DropdownMenu.Separator />


    <DropdownMenu.Sub>
        <IncognitoToggle type="text" />
    </DropdownMenu.Sub>
    <DropdownMenu.Separator />

<DropdownMenu.Item>
    <Link class="block w-full" method="post" onclick={handleLogout} href={route('logout')} as="button">
        <div class="flex items-center">
            <LogOut class="mr-2 size-4" />
            <span>Log out</span>
        </div>
    </Link>
</DropdownMenu.Item>

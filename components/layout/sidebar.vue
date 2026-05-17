<script setup>
import PersonalCard from "@/components/cards/PersonalCard.vue";

const { logout, user } = useAuth();
const { t } = useTranslations();

const isSidebarOpen = inject("isSidebarOpen");

const links = [
    {
        labelKey: "sidebar.dashboard",
        link: "/",
        icon: "lucide:layout-dashboard",
    },
    {
        labelKey: "sidebar.academics",
        link: "/academics",
        icon: "lucide:graduation-cap",
    },
    { labelKey: "sidebar.tasks", link: "/tasks", icon: "lucide:file-check" },
    {
        labelKey: "sidebar.assignments",
        link: "/assignments",
        icon: "lucide:check",
    },
    {
        labelKey: "sidebar.activities",
        link: "/activities",
        icon: "lucide:folder-pen",
    },
    { labelKey: "sidebar.honors", link: "/honors", icon: "lucide:medal" },
    {
        labelKey: "sidebar.personal",
        link: "/personal-development",
        icon: "lucide:book-open",
    },
    {
        labelKey: "sidebar.majors",
        link: "/majors-careers",
        icon: "lucide:briefcase-business",
    },
    {
        labelKey: "sidebar.booking",
        link: "/booking",
        icon: "lucide:calendar-days",
    },
    {
        labelKey: "sidebar.essay",
        link: "/essay-lab",
        icon: "lucide:test-tubes",
    },
    {
        labelKey: "sidebar.teachers",
        link: "/teachers",
        icon: "lucide:user-round-pen",
    },
];

const studentLinks = new Set([
    "/",
    "/tasks",
    "/booking",
    "/essay-lab",
    "/teachers",
]);

const visibleLinks = computed(() => {
    if (user.value?.role === "VIP_STUDENT") {
        return links;
    }

    return links.filter((link) => studentLinks.has(link.link));
});
</script>

<template>
    <div class="sidebar" :class="{ open: isSidebarOpen }">
        <div class="slider">
            <div class="top">
                <NuxtImg
                    src="/images/brand.svg"
                    alt="Brand"
                    class="logo"
                    width="140"
                    height="48"
                />
            </div>
            <div class="bottom">
                <div>
                    <PersonalCard />
                    <ul>
                        <li v-for="link in visibleLinks" :key="link.link">
                            <NuxtLink :to="link.link">
                                <Icon :name="link.icon" class="icon" />
                                {{ t(link.labelKey) }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="logout">
                    <button @click="logout">
                        <Icon name="lucide:log-out" class="icon" />
                        {{ t("sidebar.logout") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    width: 264px;
    height: 100%;
    border-right: 1px solid var(--border);
    position: fixed;
    z-index: 3;
    background: white;
    left: -264px;
    transition: left 0.3s ease;
}
.sidebar.open {
    left: 0;
}
.slider {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.top {
    padding: 19px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 1;
    background: white;
    flex-shrink: 0;
}
.bottom {
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    height: 100%;
    justify-content: space-between;
    overflow: auto;
}
.bottom::-webkit-scrollbar {
    display: none;
}
.bottom {
    scrollbar-width: none;
}
.bottom {
    -ms-overflow-style: none;
}
.bottom ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
}
.bottom a {
    display: grid;
    grid-template-columns: 20px auto;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    color: var(--light-grey);
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s;
    position: relative;
}
.bottom a::after {
    content: "";
    position: absolute;
    top: 50%;
    left: -16px;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    border-radius: 0 4px 4px 0;
    transition: all 0.2s;
    background: var(--blue);
    opacity: 0;
    visibility: hidden;
}
.bottom a:hover::after {
    opacity: 1;
    visibility: visible;
}
.bottom a:hover {
    background-color: var(--light-blue);
    color: var(--blue);
}
.bottom a.router-link-active {
    background-color: var(--light-blue);
    color: var(--blue);
}
.bottom a.router-link-active::after {
    opacity: 1;
    visibility: visible;
}
.bottom span {
    width: 20px;
    height: 20px;
}
.logout button {
    display: grid;
    grid-template-columns: 20px auto;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    color: var(--light-grey);
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-family: inherit;
    font-size: inherit;
}
.logout button:hover {
    background-color: var(--light-blue);
    color: var(--blue);
}
</style>

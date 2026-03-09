<template>
  <div class="flex justify-center py-12">
    <Card class="card w-full max-w-md">
      <CardHeader class="flex justify-between">
        <div>
          <CardTitle class="text-neutral-900 dark:text-neutral-50">Se connecter</CardTitle>
          <CardDescription class="text-neutral-600 dark:text-neutral-400">Accédez à votre tableau de bord</CardDescription>
        </div>
        <div>
          <Button as-child variant="link" class="text-primary-600 dark:text-primary-400 hover:underline">
            <NuxtLink to="/register">
              S'enregistrer
            </NuxtLink>
          </Button>
        </div>
      </CardHeader>

      <form @submit.prevent="handleLogin">
        <CardContent class="space-y-6">
        <div>
          <Label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</Label>
          <Input
              id="email"
              v-model="credentials.email"
              type="email"
              required
              class="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              placeholder="votre@email.com"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <Label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Mot de
              passe</Label>
          </div>
          <Input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              placeholder="••••••••"
          />
        </div>
        </CardContent>

        <CardFooter>
          <Button
              type="submit"
              class="w-full btn btn-primary flex justify-center cursor-pointer "
          >
            Se connecter
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {CardDescription, Card, CardContent, CardHeader, CardTitle, CardFooter} from "~/components/ui/card";
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'

const {fetch: refreshSession} = useUserSession()
const credentials = ref({
  email: '',
  password: '',
});

async function handleLogin() {
  $fetch('/api/auth/login', {
    method: 'POST',
    body: {
      email: credentials.value.email,
      password: credentials.value.password,
    }
  })
      .then(async () => {
        await refreshSession()
        await navigateTo('/')
      })
      .catch(() => alert('Bad credentials'))
}
</script>

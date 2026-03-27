<template>
  <div class="pt-4 pb-8 px-4">
    <div class="max-w-7xl mx-auto">

      <div class="flex justify-center mb-10 w-full">
        <div
            class="bg-gray-50 dark:bg-neutral-800/50 p-1.5 rounded-lg flex flex-wrap justify-center items-center gap-2 border border-gray-200 dark:border-neutral-700 backdrop-blur-sm z-20 w-full sm:w-auto">
          <Button
              v-for="p in ['month', 'quarter', 'year']"
              :key="p"
              class="cursor-pointer flex-1 sm:flex-none px-2 sm:px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-out whitespace-nowrap"
              :class="period === p
  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-md transform scale-105'
  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'"
              @click="changePeriod(p)"
          >
            {{ p === 'month' ? 'Mois' : p === 'quarter' ? 'Trimestre' : 'Année' }}
          </Button>

          <div v-if="period === 'year'" class="hidden sm:block h-4 w-px bg-gray-300 dark:bg-neutral-600 mx-1"/>

          <div v-if="period === 'year'" class="relative w-full sm:w-auto mt-2 sm:mt-0">
            <Button
                class="cursor-pointer flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-4 py-2 text-sm font-bold text-primary-600 dark:bg-neutral-700 rounded-lg shadow-md transition-all"
                @click="isYearMenuOpen = !isYearMenuOpen"
            >
              {{ selectedYear }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform"
                   :class="isYearMenuOpen ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
              </svg>
            </Button>

            <div
                v-if="isYearMenuOpen"
                class="absolute top-full mt-2 right-0 w-full sm:w-32 bg-white dark:bg-neutral-700 rounded-lg shadow-xl border border-gray-100 dark:border-neutral-700 overflow-hidden z-50"
            >
              <Button
                  v-for="annee in anneesData?.years"
                  :key="annee"
                  class="cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                  :class="selectedYear === annee ? 'text-primary-600 font-bold bg-indigo-50 dark:bg-neutral-700/50' : 'text-neutral-600 dark:text-neutral-300'"
                  @click="selectYear(annee)"
              >
                {{ annee }}
              </Button>
            </div>
          </div>
          <div v-if="period === 'month'" class="hidden sm:block h-4 w-px bg-gray-300 dark:bg-neutral-600 mx-1"/>

          <div v-if="period === 'month'" class="relative w-full sm:w-auto mt-2 sm:mt-0">
            <Button
                class="cursor-pointer flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-4 py-2 text-sm font-bold text-primary-600 dark:bg-neutral-700 rounded-lg shadow-md transition-all"
                @click="isMonthMenuOpen = !isMonthMenuOpen"
            >
              {{ monthNames[selectedMonth - 1] }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform"
                   :class="isMonthMenuOpen ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
              </svg>
            </Button>

            <div
                v-if="isMonthMenuOpen"
                class="absolute top-full mt-2 right-0 w-full sm:w-32 bg-white dark:bg-neutral-700 rounded-lg shadow-xl border border-gray-100 dark:border-neutral-700 overflow-hidden z-50"
            >
              <Button
                  v-for="mois in moisData?.months"
                  :key="mois"
                  class="cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                  :class="selectedMonth === mois ? 'text-primary-600 font-bold bg-indigo-50 dark:bg-neutral-700/50' : 'text-neutral-600 dark:text-neutral-300'"
                  @click="selectMonth(mois)"
              >
                {{ monthNames[mois - 1] }}
              </Button>
            </div>
          </div>
          <div v-if="period === 'quarter'" class="hidden sm:block h-4 w-px bg-gray-300 dark:bg-neutral-600 mx-1"/>

          <div v-if="period === 'quarter'" class="relative w-full sm:w-auto mt-2 sm:mt-0">
            <Button
                class="cursor-pointer flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-4 py-2 text-sm font-bold text-primary-600 dark:bg-neutral-700 rounded-lg shadow-md transition-all"
                @click="isQuarterMenuOpen = !isQuarterMenuOpen"
            >
              {{ quarterLabels[selectedQuarter] }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform"
                   :class="isQuarterMenuOpen ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
              </svg>
            </Button>

            <div
                v-if="isQuarterMenuOpen"
                class="absolute top-full mt-2 right-0 w-full sm:w-32 bg-white dark:bg-neutral-700 rounded-lg shadow-xl border border-gray-100 dark:border-neutral-700 overflow-hidden z-50"
            >
              <Button
                  v-for="trimestre in trimestresData?.quarters"
                  :key="trimestre"
                  class="cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                  :class="selectedQuarter === trimestre ? 'text-primary-600 font-bold bg-indigo-50 dark:bg-neutral-700/50' : 'text-neutral-600 dark:text-neutral-300'"
                  @click="selectQuarter(trimestre)"
              >
                {{ quarterLabels[trimestre] }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Card
          class="card mb-8 p-8 bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300">
        <CardHeader class="flex justify-between items-end mb-8">
          <CardTitle class="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Cashflow</CardTitle>
          <CardDescription class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Visualisation des mouvements
            financiers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly>
            <div v-if="cleanTransactions.length === 0" class="flex items-center justify-center">
              <p>Aucune donnée.</p>
            </div>
            <div v-else class="flex flex-col h-full w-full dark:unovis-dark-mode">
              <p class="text-xs text-neutral-400 mb-2 italic text-center">
                💡 Cliquez sur un nœud pour déployer le détail des transactions.
              </p>
              <ChartContainer :config="chartConfig">
                <VisSingleContainer :data="cashFlow" class="h-full w-full sankeyGraph">
                  <VisSankey
                      :node-id="(d) => d.id"
                      :node-label="(d) => d.label"
                      :node-icon="(d) => {
                        if (d.type === 'expense') {
                          return activeCategory === d.id ? '-' : '+';
                        }
                        return '';
                      }"
                      :source="(d) => d.source"
                      :target="(d) => d.target"
                      :value="(d) => d.value"
                      :node-color="(node) => {
                        if (node.type === 'budget') return THEME.colors.expense;
                        if (node.type === 'income') return THEME.colors.expense;
                        if (node.type === 'expense') return THEME.colors.expense;
                        return THEME.colors.income;
                      }"
                      :node-width="20"
                      :node-padding="15"
                      :events="sankeyEvents"
                  />
                  <ChartTooltip/>
                </VisSingleContainer>
              </ChartContainer>
            </div>
          </ClientOnly>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        <Card
            class="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle class="text-neutral-900 dark:text-white tracking-tight">Revenus vs Dépenses</CardTitle>
            <CardDescription class="text-neutral-500 dark:text-neutral-400">Comparatif des volumes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer class="h-[350px]" :config="chartConfig">
              <VisXYContainer :data="incomeVsExpensesData">
                <VisStackedBar
                    :x="(d,i) => i"
                    :y="[(d) => d.income, (d) => d.expense]"
                    :color="(d, i) => [THEME.colors.income, THEME.colors.expense][i]"
                    :barPadding="0.4"
                />
                <VisAxis
                    type="x"
                    :tick-line="false"
                    :domain-line="false"
                    :grid-line="false"
                    :tick-format="(index) => incomeVsExpensesData[index]?.dateLabel"
                />
                <VisAxis
                    type="y"
                    :num-ticks="3"
                    :tick-line="false"
                    :domain-line="false"
                />
                <ChartTooltip/>
                <ChartCrosshair
                    :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'dateLabel' })"
                    :color="(d, i) => [THEME.colors.income, THEME.colors.expense][i]"
                />
              </VisXYContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card
            class="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle class="text-neutral-900 dark:text-white tracking-tight">Solde du compte</CardTitle>
            <CardDescription class="text-neutral-500 dark:text-neutral-400">Évolution du solde réel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer class="h-[350px]" :config="chartConfig">
              <VisXYContainer :data="currentYearBalanceData">
                <VisArea
                    :x="(d, i) => i"
                    :y="[(d) => d.balance]"
                    :color="() => chartConfig.balance.color"
                    :opacity="0.3"
                />
                <VisLine
                    :x="(d, i) => i"
                    :y="[(d) => d.balance]"
                    :color="() => chartConfig.balance.color"
                    :line-width="2.5"
                />
                <VisAxis
                    type="x"
                    :x="(d, i) => i"
                    :tick-line="false"
                    :domain-line="false"
                    :grid-line="false"
                    :num-ticks="6"
                    :tick-format="(d, i) => {
                    return currentYearBalanceData[i]?.dateLabel;
                  }"
                />
                <VisAxis
                    type="y"
                    :num-ticks="5"
                    :tick-line="false"
                    :domain-line="false"
                />
                <ChartTooltip/>
                <ChartCrosshair
                    :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'dateLabel' })"
                    :color="() => chartConfig.balance.color"
                />
              </VisXYContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {VisStackedBar, VisArea, VisAxis, VisLine, VisXYContainer, VisSankey, VisSingleContainer} from "@unovis/vue";
import {Sankey} from "@unovis/ts";
import {ChartContainer, ChartCrosshair, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {componentToString} from "@/components/ui/chart/utils";

// =========================================================================
// 1. CONSTANTS & CONFIGURATION
// =========================================================================

const CURRENT_YEAR_FIXED = new Date().getFullYear();
const CURRENT_MONTH_FIXED = new Date().getMonth() + 1;
const CURRENT_QUARTER_FIXED = Math.floor(new Date().getMonth() / 3) + 1;

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const quarterLabels = {1: "Jan. - Mars", 2: "Avr. - Juin", 3: "Juil. - Sept.", 4: "Oct. - Déc."};

const THEME = {
  colors: {
    balance: '#7bf1a8', income: '#7bf1a8', expense: '#00a63e',
    textLight: '#64748b', textDark: '#94a3b8',
    gridLight: '#e2e8f0', gridDark: '#334155',
    cardBgLight: '#ffffff', cardBgDark: 'rgba(51,65,85,0)',
  }
};

const chartConfig = {
  balance: {label: "Solde", color: THEME.colors.balance},
  income: {label: "Revenus", color: THEME.colors.income},
  expense: {label: "Dépenses", color: THEME.colors.expense}
};

// =========================================================================
// 2. REACTIVE STATE
// =========================================================================

const period = ref('month');
const selectedYear = ref(CURRENT_YEAR_FIXED);
const selectedMonth = ref(CURRENT_MONTH_FIXED);
const selectedQuarter = ref(CURRENT_QUARTER_FIXED);

const isYearMenuOpen = ref(false);
const isMonthMenuOpen = ref(false);
const isQuarterMenuOpen = ref(false);
const activeCategory = ref(null);

// =========================================================================
// 3. API FETCHING
// =========================================================================

// Fetch static calendar options
const {data: anneesData} = await useFetch('/api/calendar/years');
const {data: trimestresData} = await useFetch('/api/calendar/quarters');
const {data: moisData} = await useFetch('/api/calendar/months');

// Dynamic query parameters that trigger re-fetch when filters change
const queryParams = computed(() => {
  const params = {year: selectedYear.value};

  if (period.value === 'month') {
    params.month = selectedMonth.value;
  } else if (period.value === 'quarter') {
    params.quarter = selectedQuarter.value;
  }

  return params;
});

// Primary data fetch (reacts to queryParams)
const {data: transactionsData} = await useFetch('/api/calendar/', {
  key: 'dynamic-transactions',
  query: queryParams,
  watch: [queryParams]
});

// Secondary data fetch (fixed for the full year line chart)
const {data: transactionsFixed2026Data} = await useFetch('/api/calendar/', {
  key: 'fixed-balance',
  query: {year: CURRENT_YEAR_FIXED},
});

// =========================================================================
// 4. UI ACTIONS
// =========================================================================

const changePeriod = (p) => {
  if (period.value === p) return;
  period.value = p;

  // Reset expanded Sankey node
  activeCategory.value = null;

  // Reset inactive filters to the current calendar date
  if (p !== 'year') selectedYear.value = CURRENT_YEAR_FIXED;
  if (p !== 'month') selectedMonth.value = CURRENT_MONTH_FIXED;
  if (p !== 'quarter') selectedQuarter.value = CURRENT_QUARTER_FIXED;
};

const selectYear = (annee) => {
  selectedYear.value = annee;
  isYearMenuOpen.value = false;
};
const selectMonth = (mois) => {
  selectedMonth.value = mois;
  isMonthMenuOpen.value = false;
};
const selectQuarter = (trimestre) => {
  selectedQuarter.value = trimestre;
  isQuarterMenuOpen.value = false;
};

// =========================================================================
// 5. DATA PROCESSING (CHARTS)
// =========================================================================

/**
 * Normalizes raw API data and sorts it chronologically.
 */
const cleanTransactions = computed(() => {
  const rawData = transactionsData.value?.transactions || [];
  if (rawData.length === 0) return [];

  return rawData.map(t => {
    const d = new Date(t.date);
    return {
      ...t,
      categoryName: t.category ? t.category.name : (t.categoryName || 'Autre'),
      dateObj: Number.isNaN(d.getTime()) ? new Date() : d,
      amount: Math.abs(Number(t.amount)),
      typeStr: t.typeStr || (Number(t.amount) >= 0 ? 'income' : 'expense'),
    };
  }).sort((a, b) => a.dateObj - b.dateObj);
});

/**
 * Aggregates income and expenses for the Stacked Bar Chart.
 * Groups by day (if month view) or by month (if quarter/year view).
 */
const incomeVsExpensesData = computed(() => {
  const groupedData = new Map();

  // --- ÉTAPE A : PRÉ-REMPLISSAGE (Initialization) ---

  if (period.value === 'year') {
    // Fill all 12 months of the year
    for (let i = 0; i < 12; i++) {
      const monthLabel = new Date(selectedYear.value, i, 1)
          .toLocaleString('fr-FR', { month: 'short' });
      groupedData.set(monthLabel, { income: 0, expense: 0 });
    }
  }
  else if (period.value === 'quarter') {
    // Fill the 3 months of the specific quarter
    const startMonth = (selectedQuarter.value - 1) * 3;
    for (let i = 0; i < 3; i++) {
      const monthLabel = new Date(selectedYear.value, startMonth + i, 1)
          .toLocaleString('fr-FR', { month: 'short' });
      groupedData.set(monthLabel, { income: 0, expense: 0 });
    }
  }
  else if (period.value === 'month') {
    // Fill all days of the specific month
    const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayLabel = new Date(selectedYear.value, selectedMonth.value - 1, i)
          .toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
      groupedData.set(dayLabel, { income: 0, expense: 0 });
    }
  }

  // --- ÉTAPE B : REMPLISSAGE (Injection) ---
  cleanTransactions.value.forEach(t => {
    const useMonthlyGrouping = period.value === 'year' || period.value === 'quarter';
    const key = useMonthlyGrouping
        ? t.dateObj.toLocaleString('fr-FR', { month: 'short' })
        : t.dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

    if (groupedData.has(key)) {
      const entry = groupedData.get(key);
      if (t.typeStr === 'income' || t.typeTransactionsId === 1) {
        entry.income += t.amount;
      } else {
        entry.expense += t.amount;
      }
    }
  });

  // --- ÉTAPE C : CONVERSION ---
  return Array.from(groupedData, ([periodLabel, dataBar]) => ({
    dateLabel: periodLabel,
    ...dataBar
  }));
});

/**
 * Builds nodes and links for the Unovis Sankey graph.
 * Incomes are mapped directly, expenses are grouped by category (expandable).
 */
const cashFlow = computed(() => {
  if (import.meta.server || !cleanTransactions.value.length) {
    return {nodes: [], links: []};
  }

  const nodes = [{id: 'center_budget', label: 'Mon Budget', type: 'budget'}];
  const links = [];
  const expenseCats = {};
  let incomeIndex = 0;

  cleanTransactions.value.forEach(t => {
    const val = Math.abs(t.amount);

    if (t.typeStr === 'income' || t.typeTransactionsId === 1) {
      // Incomes stream directly to the center
      const id = `income_t_${incomeIndex++}`;
      const label = `${t.name || t.categoryName || 'Revenu'} (${val}€)`;

      nodes.push({id, label, type: 'income'});
      links.push({source: id, target: 'center_budget', value: val});
    } else {
      // Expenses are aggregated by category first
      let cat = t.categoryName || 'Autre';
      if (cat.toLowerCase() === 'budget') cat = 'Budget (Cat)';
      expenseCats[cat] = (expenseCats[cat] || 0) + val;
    }
  });

  // Add aggregated expense nodes
  Object.entries(expenseCats).forEach(([name, value]) => {
    if (value > 0) {
      const id = `${name}_out`;
      nodes.push({id, label: name, type: 'expense'});
      links.push({source: 'center_budget', target: id, value});

      // If category is clicked (active), deploy its sub-transactions
      if (activeCategory.value === id) {
        const subs = cleanTransactions.value.filter(t =>
            (t.categoryName || 'Autre') === name && t.typeStr !== 'income' && t.typeTransactionsId !== 1
        );

        subs.forEach((t, i) => {
          const subId = `${id}_sub_${i}`;
          nodes.push({id: subId, label: `${t.name || 'Transaction'} (${Math.abs(t.amount)}€)`, type: 'sub'});
          links.push({source: id, target: subId, value: Math.abs(t.amount)});
        });
      }
    }
  });

  return {nodes, links};
});

const handleNodeClick = (node) => {
  const data = node?.id ? node : node?.object;
  // Ensure only expense categories are expandable (incomes are already deployed)
  if (data?.type === 'expense') {
    activeCategory.value = activeCategory.value === data.id ? null : data.id;
  }
};

const sankeyEvents = {
  [Sankey.selectors.node]: {
    click: (node) => handleNodeClick(node)
  }
};

/**
 * Calculates the cumulative balance for the Line/Area chart.
 * Uses fixed annual data regardless of the currently selected period.
 */
const currentYearBalanceData = computed(() => {
  const source = transactionsFixed2026Data.value?.transactions || [];
  const initialBalance = transactionsFixed2026Data.value?.initialBalance || 0;

  if (!source.length && initialBalance === 0) return [];

  const mapped = source.map(t => {
    const rawAmount = Number(t.amount);
    return {
      dateObj: new Date(t.date),
      amount: Math.abs(rawAmount),
      typeStr: t.typeStr || (rawAmount >= 0 ? 'income' : 'expense'),
    };
  }).sort((a, b) => a.dateObj - b.dateObj);

  let runningBalance = initialBalance;
  const dailyMap = new Map();

  const startDate = new Date(selectedYear.value, 0, 1);
  const startKey = startDate.toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit'});

  dailyMap.set(startKey, initialBalance);

  mapped.forEach(t => {
    if (t.typeStr === 'income') runningBalance += t.amount;
    else runningBalance -= t.amount;

    if (t.dateObj.getFullYear() === selectedYear.value) {
      const dateKey = t.dateObj.toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit'});
      dailyMap.set(dateKey, runningBalance);
    }
  });

  const now = new Date();
  if (now.getFullYear() === selectedYear.value) {
    const todayKey = now.toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit'});
    dailyMap.set(todayKey, runningBalance);
  }

  return Array.from(dailyMap, ([dateLabel, balance]) => ({
    dateLabel,
    balance
  }));
});
</script>

<style>
.sankeyGraph g rect {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.sankeyGraph path {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

/* Dark Mode overrides via Tailwind parent class */
html.dark .sankeyGraph path {
  opacity: 0.15 !important;
}

html.dark .sankeyGraph text {
  fill: #ffffff !important;
}
</style>
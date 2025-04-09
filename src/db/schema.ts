import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// export const projects = pgTable("projects", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
// });

// export const scenarios = pgTable("scenarios", {
//   id: serial("id").primaryKey(),
//   project: integer("project_id")
//     .references(() => projects.id)
//     .notNull(),
//   name: varchar("name", { length: 100 }).notNull(),
// });

// export const testcases = pgTable("testcases", {
//   id: serial("id").primaryKey(),
//   scenario: integer("scenario_id")
//     .references(() => scenarios.id)
//     .notNull(),
//   name: varchar("name", { length: 100 }).notNull(),
// });

// export const tools = pgTable("tools", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 50 }).notNull(),
// });

// export const statuses = pgTable("statuses", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 10 }).notNull(),
// });

// export const reports = pgTable("reports", {
//   id: serial("id").primaryKey(),
//   project: integer("project_id")
//     .references(() => projects.id)
//     .notNull(),
//   scenario: integer("scenario_id")
//     .references(() => scenarios.id)
//     .notNull(),
//   testcase: integer("testcase_id")
//     .references(() => testcases.id)
//     .notNull(),
//   tool: integer("tool_id")
//     .references(() => tools.id)
//     .notNull(),
//   activity: varchar("activity", { length: 50 }).notNull(),
//   author: varchar("author", { length: 50 }).notNull(),
// });

// export const reportDetails = pgTable("report_details", {
//   id: serial("id").primaryKey(),
//   report: integer("report_id")
//     .references(() => reports.id)
//     .notNull(),
//   status: integer("status_id").references(() => statuses.id),
//   stepNumber: integer("step_number"),
//   title: varchar("title", { length: 100 }),
//   description: text(),
//   image: varchar("image", { length: 50 }).notNull(),
// });

// export const fileRecords = pgTable("file_records", {
//   id: serial("id").primaryKey(),
//   scenario: integer("scenario_id")
//     .references(() => scenarios.id)
//     .notNull(),
//   testcase: integer("testcase_id")
//     .references(() => testcases.id)
//     .notNull(),
//   status: integer("status_id")
//     .references(() => statuses.id)
//     .notNull(),
//   fileName: varchar("file_name", { length: 255 }).notNull(),
//   createdTime: integer("created_time").notNull(),
// });

// // Relation
// export const projectsRelations = relations(projects, ({ many }) => ({
//   scenarios: many(scenarios),
//   reports: many(reports),
// }));

// export const scenariosRelations = relations(scenarios, ({ one, many }) => ({
//   project: one(projects, {
//     fields: [scenarios.project],
//     references: [projects.id],
//   }),
//   testcases: many(testcases),
//   reports: many(reports),
//   fileRecords: many(fileRecords),
// }));

// export const testcasesRelations = relations(testcases, ({ one, many }) => ({
//   scenario: one(scenarios, {
//     fields: [testcases.scenario],
//     references: [scenarios.id],
//   }),
//   reports: many(reports),
//   fileRecords: many(fileRecords),
// }));

// export const toolsRelations = relations(tools, ({ many }) => ({
//   reports: many(reports),
// }));

// export const statusesRelations = relations(statuses, ({ many }) => ({
//   reportDetails: many(reportDetails),
//   fileRecords: many(fileRecords),
// }));

// export const reportsRelations = relations(reports, ({ one, many }) => ({
//   project: one(projects, {
//     fields: [reports.project],
//     references: [projects.id],
//   }),
//   scenario: one(scenarios, {
//     fields: [reports.scenario],
//     references: [scenarios.id],
//   }),
//   testcase: one(testcases, {
//     fields: [reports.testcase],
//     references: [testcases.id],
//   }),
//   tool: one(tools, {
//     fields: [reports.tool],
//     references: [tools.id],
//   }),
//   reportDetails: many(reportDetails),
// }));

// export const reportDetailsRelations = relations(reportDetails, ({ one }) => ({
//   report: one(reports, {
//     fields: [reportDetails.report],
//     references: [reports.id],
//   }),
//   status: one(statuses, {
//     fields: [reportDetails.status],
//     references: [statuses.id],
//   }),
// }));

// export const fileRecordsRelations = relations(fileRecords, ({ one }) => ({
//   scenario: one(scenarios, {
//     fields: [fileRecords.scenario],
//     references: [scenarios.id],
//   }),
//   testcase: one(testcases, {
//     fields: [fileRecords.testcase],
//     references: [testcases.id],
//   }),
//   status: one(statuses, {
//     fields: [fileRecords.status],
//     references: [statuses.id],
//   }),
// }));

// New Schema

// Table

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  roleId: integer("role_id")
    .references(() => roles.id)
    .notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  username: varchar("username", { length: 30 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  tempPassword: varchar("temp_password", { length: 255 }),
  reset: boolean("reset").notNull(),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 10 }).notNull(),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const userTeams = pgTable("user_teams", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  teamId: integer("team_id")
    .references(() => teams.id)
    .notNull(),
  leader: boolean("leader").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .references(() => teams.id)
    .notNull(),
  toolId: integer("tool_id")
    .references(() => tools.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  key: varchar("key", { length: 40 }).notNull(),
});

export const moduleLevels = pgTable("module_level", {
  id: serial("id").primaryKey(),
  format: varchar("format", { length: 15 }).notNull(),
  description: text("description"),
});

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  moduleLeveId: integer("module_leve_id")
    .references(() => moduleLevels.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const activityModules = pgTable("activity_modules", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id")
    .references(() => activities.id)
    .notNull(),
  moduleId: integer("module_id")
    .references(() => modules.id)
    .notNull(),
});

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id")
    .references(() => modules.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const testcases = pgTable("testcases", {
  id: serial("id").primaryKey(),
  scenarioId: integer("scenario_id")
    .references(() => scenarios.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const statuses = pgTable("statuses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 10 }).notNull(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id")
    .references(() => activities.id)
    .notNull(),
  scenarioId: integer("scenario_id").references(() => scenarios.id),
  testcaseId: integer("testcase_id").references(() => testcases.id),
  statusId: integer("status_id").references(() => statuses.id),
  fileName: varchar("file_name", { length: 255 }),
  createdTime: integer("created_time"),
});

export const testSteps = pgTable("teststeps", {
  id: serial("id").primaryKey(),
  reportId: integer("report_id")
    .references(() => reports.id)
    .notNull(),
  statusId: integer("status_id").references(() => statuses.id),
  title: varchar("title", { length: 100 }),
  description: text("description"),
  stepNumber: integer("step_number").notNull(),
  image: varchar("image", { length: 50 }).notNull(),
});

// Relations

export const usersRelations = relations(users, ({ one, many }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  userTeams: many(userTeams),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  userTeams: many(userTeams),
  projects: many(projects),
}));

export const userTeamsRelations = relations(userTeams, ({ one }) => ({
  user: one(users, {
    fields: [userTeams.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [userTeams.teamId],
    references: [teams.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
  tool: one(tools, {
    fields: [projects.toolId],
    references: [tools.id],
  }),
  modules: many(modules),
  activities: many(activities),
}));

export const toolsRelations = relations(tools, ({ many }) => ({
  projects: many(projects),
}));

export const activitiesRelations = relations(activities, ({ one, many }) => ({
  project: one(projects, {
    fields: [activities.projectId],
    references: [projects.id],
  }),
  activityModules: many(activityModules),
  reports: many(reports),
}));

export const moduleLevelsRelations = relations(moduleLevels, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  project: one(projects, {
    fields: [modules.projectId],
    references: [projects.id],
  }),
  moduleLevel: one(moduleLevels, {
    fields: [modules.moduleLeveId],
    references: [moduleLevels.id],
  }),
  activityModules: many(activityModules),
  scenarios: many(scenarios),
}));

export const activityModulesRelations = relations(activityModules, ({ one }) => ({
  activity: one(activities, {
    fields: [activityModules.activityId],
    references: [activities.id],
  }),
  module: one(modules, {
    fields: [activityModules.moduleId],
    references: [modules.id],
  }),
}));

export const scenariosRelations = relations(scenarios, ({ one, many }) => ({
  module: one(modules, {
    fields: [scenarios.moduleId],
    references: [modules.id],
  }),
  testcases: many(testcases),
  reports: many(reports),
}));

export const testcasesRelations = relations(testcases, ({ one, many }) => ({
  scenario: one(scenarios, {
    fields: [testcases.scenarioId],
    references: [scenarios.id],
  }),
  reports: many(reports),
}));

export const statusesRelations = relations(statuses, ({ many }) => ({
  reports: many(reports),
  testSteps: many(testSteps),
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  activity: one(activities, {
    fields: [reports.activityId],
    references: [activities.id],
  }),
  scenario: one(scenarios, {
    fields: [reports.scenarioId],
    references: [scenarios.id],
  }),
  testcase: one(testcases, {
    fields: [reports.testcaseId],
    references: [testcases.id],
  }),
  status: one(statuses, {
    fields: [reports.statusId],
    references: [statuses.id],
  }),
  testSteps: many(testSteps),
}));

export const testStepsRelations = relations(testSteps, ({ one }) => ({
  report: one(reports, {
    fields: [testSteps.reportId],
    references: [reports.id],
  }),
  status: one(statuses, {
    fields: [testSteps.statusId],
    references: [statuses.id],
  }),
}));

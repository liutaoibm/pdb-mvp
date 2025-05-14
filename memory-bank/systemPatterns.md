# System Patterns

## System Architecture
the project will have one front end app and one backend app. The front end app and backend app will integrate by rest APIs. 

## Key Technical Decisions
the frontend app will use 
-latest next.js
-carbon design system
-blue/white as main color scheme
-support day/night mode switch

the backend app will use
-latest node.js
-sqlite in memory db
-common-logging-lib for standardized logging

## Design Patterns in Use
- Microservice architecture
- REST API patterns
- Repository pattern for data access
- Standardized logging patterns using common-logging-lib

## Component Relationships
the frontend app is calling apis from backend app to read/update data.

## Critical Implementation Paths
Outlines the critical paths for implementation in the system.

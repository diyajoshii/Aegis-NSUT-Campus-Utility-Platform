# Aegis-NSUT: Smart Campus Utility Platform

Aegis is an integrated campus utility platform designed for students of **Netaji Subhas University of Technology (NSUT)**. It brings together academic assistance, scholarship discovery, skill assessment, and campus lost-and-found services into a single platform.

The platform combines intelligent automation and AI-assisted features to simplify common student workflows and improve access to campus resources.

---

## Overview

Managing academic responsibilities, discovering scholarships, developing technical skills, and recovering lost belongings often requires students to rely on multiple disconnected resources.

Aegis addresses these challenges through a modular platform consisting of four core services:

- **ScholarAid** — Scholarship discovery and assistance
- **Reclaimr** — Campus lost-and-found management
- **SkillX** — Skill assessment and proctored testing
- **Sylly** — Syllabus-based academic assistance

---

## Core Modules

### ScholarAid

A scholarship discovery and recommendation system designed to help students identify opportunities based on their eligibility and requirements.

#### Features

- AI-assisted scholarship discovery through **Pathya**
- Search and filter scholarships by state, category, and eligibility
- Central and state-level scholarship schemes
- Scholarship details and application links
- Deadline tracking and reminders
- Personalized recommendations based on student requirements

---

### Reclaimr

A campus-focused lost-and-found system that helps students report, discover, and recover lost belongings.

#### Features

- Create lost and found item listings
- Add item descriptions and images
- Intelligent matching between lost and found reports
- Student identity verification for item recovery
- Notifications for potential matches

---

### SkillX

A skill assessment platform for students, clubs, and societies to conduct structured technical assessments.

#### Features

- Multiple-choice and coding-based assessments
- Support for 15+ technical domains, including:
  - C++
  - Java
  - Machine Learning
  - Web Development
  - and more
- Custom test creation and hosting for clubs and societies
- Automated test evaluation
- Proctored assessments using `tiny_face_detector_model`
- Detection of:
  - Multiple faces
  - Tab switching
  - Screen recording attempts
  - Other assessment violations
- Full-screen assessment mode
- Automatic submission after repeated violations
- Performance analytics including:
  - Test score
  - Violation summary
  - Average score
  - Highest score
  - Latest score

---

### Sylly

An AI-powered academic assistant designed around a student's syllabus and study requirements.

#### Features

- Syllabus-aligned academic assistance
- AI-powered question answering
- Study planning and scheduling
- Automated study notes based on syllabus topics
- Custom study plans
- Downloadable and shareable study resources

---

## Key Highlights

### Unified Student Platform

Aegis consolidates multiple student-focused services into a single platform instead of requiring separate applications for different campus needs.

### AI-Assisted Experiences

AI is integrated into multiple workflows, including scholarship discovery, academic assistance, and intelligent lost-and-found matching.

### Modular Architecture

Each core service is designed as an independent module, allowing the platform to be extended with additional campus utilities in the future.

### Campus-Centric Design

The platform is designed around practical challenges faced by students in an academic environment, with an emphasis on accessibility and automation.

---

## Future Scope

Planned extensions to the platform include:

- Internship and placement updates
- Club and society event management
- Mentorship matchmaking
- Student analytics dashboard
- Additional academic utilities
- Campus announcements and notifications
- Integration with additional university services

---

## Project Structure

```text
Aegis-NSUT-Campus-Utility-Platform/
│
├── backend/
│   └── ...
│
└── frontend/
    └── ...

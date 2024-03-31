---
layout: post
title:  "The Importance of Testing & Documentation"
---

# Tests & Documentation

Software Development is more than just a job, it is a craft. Like a fine woodworker, 
a skilled leather worker, or a seasoned chef, the difference is often not in getting 
the task done - but how the work stands the test of time. 

## What are the extras?

* **Testing**: Features can't just be developed, they need to be automatically tested. 
* **Documentation**: Features aren't useful if users, and even other developers, aren't 
aware of how to use them.

## When to do it?
Lots of developers, teams, etc. will agree that these need to get done. But, 
realistically, they can't get done en-masse. Automated testing can't be done as a 
final phase to a project, it just won't get done. The same goes for documentation. 
If it is going to get done, it needs to be baked into every and every task.

Here's when it should get done:

### Feature Requests / Enhancements
Whenever a feature request or enhancement is completed:

* At least one test should be added to test the added functionality.
* Ideally, one test should be added for each acceptance criteria. But, always aim 
for consistency over being exhaustive.
* Some form of documentation should be added regarding the feature. This could be 
aimply how to access the feature, options involved, etc.

### Bug Fixes
Whenever a bug is fixed:

* A test should be developed to ensure the bug doesn't return.
* Ideally, you can develop the test prior to fixing the bug to prove it exists.
Then, work to fix it. Adjust the test or add additional tests if more information 
about the bug becomes available.
* No documentation for a bug is directly needed. However, if the feature being fixed
isn't already documented, use this time to take care of it.

Whether its bug fixes, or feature flags, aim to avoid storing notes about how to use 
features in tickets. Instead, document the usage and point others to the documentation.

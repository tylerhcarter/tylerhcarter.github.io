---
title: Complexity Is Technical Debt
date: 2025-11-11
layout: post
---
> Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.
> 
> Antoine de Saint-Exupéry, Airman's Odyssey

It is easy to try to make "great" software. You see design patterns, get advice from online blogs, read a few books, and once applied surely you'll see an application that stands the test of time. But it rarely works that way.

Some new work recently gave me an opportunity to reflect on this. A few years ago, I wrote an ETL pipeline. Looking back at the code, I had to admit it was messy. There were patterns on top of patterns, best practices splattered everywhere. I tried to explain how it worked to another developer, and almost needed a glossary just to get it all out.

In approaching this new project, which admittedly does much of the same things, I was met with the realization that the code could be so much simpler. Some of the "best practices" I tried to avoid were:
- Creating abstractions where the underlying classes had no reason to be hidden/interchanged.
- Finding opportunities to use design patterns when I wasn't trying to solve a particular problem.
- Optimizing algorithms for workloads that were far beyond the scope of the project.

The result was much cleaner, more maintainable code. Notably, its code that does exactly what it needs to do. No more, no less. I did spend time thinking about how it could be expanded/shrunk later as business requirements demanded. But I avoided crafting entire components purely by speculation of these potential "what ifs?"

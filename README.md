[![CircleCI](https://circleci.com/gh/Brmlia/brmlia.svg?style=svg)](https://circleci.com/gh/Brmlia/brmlia)
[![Build Status](https://travis-ci.org/Brmlia/brmlia.svg?branch=master)](https://travis-ci.org/Brmlia/brmlia)
[![codecov](https://codecov.io/gh/Brmlia/brmlia/branch/master/graph/badge.svg)](https://codecov.io/gh/Brmlia/brmlia)

### CI Builds

For circleCI build-deploy process (only run on commits/PRs to master), all warnings are treated as errors (unless
the environment variable `CI=FALSE` is set, or other work-around), so expect
that to fail for any build that has eslint warnings. To disable a warning
explicitly, add a commented eslint directive above the location.

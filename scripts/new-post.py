#!/usr/bin/python

from datetime import date
import sys

print 'Creating new post...'

title = raw_input('Enter a title: ')

filename = '{}-{}'.format(str(date.today()), title.replace(' ', '-'))

open('posts/{}.md'.format(filename), 'w').write('---\ntitle: {}\n---'.format(title))

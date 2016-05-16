#!/usr/bin/python

from datetime import date
import sys

print 'Creating new post...'

title = raw_input('Enter a title: ')

filename = str(date.today()) + '-' + title
file = open('posts/{}.md'.format(filename), 'w')

file.write('---\ntitle: {}\n---'.format(title.replace(' ', '-')))

file.close()

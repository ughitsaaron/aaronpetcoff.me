#!/usr/bin/python

from datetime import date

def dump(ls):
    s = ''
    for e in ls:
        s += '\n  - {}'.format(e)
    return s

# Enter a title...
title = input('Enter a title: ')
assert len(title) > 0, 'A title is required'
assert isinstance(title, str), 'Response {} is not a string'.format(title)

# Write as draft?...
draft = input('Write as draft? [y/n]: ')
assert (draft == 'y' or draft == 'n'), 'Answer {} is not: \'y\' or \'n\''.format(draft)

# Tags
tags_raw = input('Tags (Separated by comma and space): ')

filename = '{}-{}'.format(str(date.today()), title.replace(' ', '-').lower())
directory = 'drafts' if 'y' else 'posts'

tags = dump(tags_raw.split(', '))

meta = """---
title: {}
tags: {}
---""".format(title, tags if len(tags_raw) > 0 else '[]')

# Write new file
print('Creating new post...')
open('{}/{}.md'.format(directory, filename), 'w').write(meta)

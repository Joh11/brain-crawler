"""A basic Org-mode parser for now"""

import re
import os

from django.conf import settings


def extract_simple(path):
    """Only the title and links"""
    # TODO links too
    # TODO title properly
    with open(path, 'r') as f:
        lines = f.readlines()
        title = _find_title(lines)
        links = _find_links(lines)
    return title, links

def extract_detail(path):
    """Title, links and content"""
    with open(path, 'r') as f:
        content = f.read()
        title, links = OrgParser.extract_simple(path)
    return title, links, content


# Private implementation
# ----------------------

def _find_title(lines):
    """Returns the title. 

    Arguments:
    lines -- list of strings
    """
    candidates = [line for line in lines if line[:9].lower() == '#+title: ']
    if len(candidates) == 0:
        return ''
    return candidates[0][9:-1] # -1 to skip the \n
    
def _find_links(lines):
    def _find_links_one(line):
        return re.findall(r'\[\[file:([^\[\]]*\.org)\]\[([^\[\]]*)\]\]', line)
    
    return [link[0] for line in lines
            for link in _find_links_one(line)]

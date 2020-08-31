"""A basic Org-mode parser for now"""

class Parser:
    @staticmethod
    def extract_simple(path):
        """Only the title and links"""
        pass

    @staticmethod
    def extract_detail(path):
        """Title, links and content"""
        pass

class OrgParser(Parser):
    @staticmethod
    def extract_simple(path):
        """Only the title and links"""
        # TODO links too
        # TODO title properly
        with open(path, 'r') as f:
            title = f.readline()
        return title[9:-1], []

    @staticmethod
    def extract_detail(path):
        """Title, links and content"""
        with open(path, 'r') as f:
            content = f.read()
        title, links = OrgParser.extract_simple(path)
        return title, links, content
